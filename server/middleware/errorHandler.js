/**
 * Shared error-handling utilities for Anthropic API routes.
 * Provides structured error responses and consistent status codes.
 */

/**
 * Map Anthropic API error responses to structured, user-friendly errors.
 */
export function mapAnthropicError(status, body) {
  const errorMap = {
    400: { code: "BAD_REQUEST", message: "Invalid request to AI service. Please check your input and try again.", retry: false },
    401: { code: "AUTH_ERROR", message: "API key is invalid or expired. Please check your Anthropic API key.", retry: false },
    403: { code: "FORBIDDEN", message: "Access denied by AI service. Your API key may lack required permissions.", retry: false },
    404: { code: "NOT_FOUND", message: "AI model not found. The requested model may have been deprecated.", retry: false },
    429: { code: "RATE_LIMITED", message: "Too many requests. The AI service is rate-limiting your account. Please wait a moment and try again.", retry: true, retryAfter: 30 },
    500: { code: "AI_SERVICE_ERROR", message: "The AI service encountered an internal error. Please try again.", retry: true, retryAfter: 10 },
    529: { code: "OVERLOADED", message: "The AI service is temporarily overloaded. Please wait a moment and try again.", retry: true, retryAfter: 30 },
  };

  const mapped = errorMap[status] || {
    code: "UNKNOWN_AI_ERROR",
    message: `AI service returned an unexpected error (HTTP ${status}). Please try again later.`,
    retry: status >= 500,
    retryAfter: status >= 500 ? 15 : undefined,
  };

  // Try to extract more detail from the body
  try {
    const parsed = typeof body === "string" ? JSON.parse(body) : body;
    if (parsed?.error?.message) {
      mapped.detail = parsed.error.message;
    }
  } catch {
    // body wasn't JSON, that's fine
  }

  return mapped;
}

/**
 * Validate that the API key and user message are present.
 * Returns an error response object if invalid, or null if valid.
 */
export function validateRequest(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { status: 503, body: { error: { code: "API_KEY_MISSING", message: "ANTHROPIC_API_KEY is not configured on the server. Please contact the administrator.", retry: false } } };
  }

  const { userMessage } = req.body;
  if (!userMessage) {
    return { status: 400, body: { error: { code: "MISSING_INPUT", message: "No input data provided. Please fill in the required fields and try again.", retry: false } } };
  }

  return null;
}

/**
 * Call Anthropic API with retry support for transient errors.
 */
export async function callAnthropic({ system, userMessage, maxTokens = 1500, maxRetries = 1 }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  let lastError = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (attempt > 0) {
      // Wait before retry (exponential backoff)
      await new Promise(r => setTimeout(r, attempt * 2000));
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: maxTokens,
          system,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        const mapped = mapAnthropicError(response.status, errBody);
        lastError = { status: response.status, mapped };

        // Only retry on transient errors
        if (mapped.retry && attempt < maxRetries) continue;

        return { error: mapped, httpStatus: response.status >= 500 ? 502 : response.status };
      }

      const data = await response.json();
      const rawText = data.content?.[0]?.text || "{}";

      let parsed;
      try {
        parsed = JSON.parse(rawText.replace(/```json|```/g, "").trim());
      } catch {
        return { error: { code: "PARSE_ERROR", message: "The AI returned an unexpected response format. Please try again.", retry: true, raw: rawText.substring(0, 200) }, httpStatus: 502 };
      }

      return { result: parsed };
    } catch (err) {
      lastError = { status: 500, mapped: { code: "NETWORK_ERROR", message: "Failed to connect to the AI service. Please check your internet connection and try again.", retry: true, detail: err.message } };
      if (attempt < maxRetries) continue;
    }
  }

  // All retries exhausted
  return { error: lastError?.mapped || { code: "UNKNOWN_ERROR", message: "An unexpected error occurred.", retry: false }, httpStatus: 502 };
}

/**
 * Express error handler middleware for uncaught errors.
 */
export function globalErrorHandler(err, req, res, _next) {
  console.error(`[${new Date().toISOString()}] Unhandled error on ${req.method} ${req.path}:`, err);
  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected server error occurred. Please try again later.",
      retry: true,
    },
  });
}
