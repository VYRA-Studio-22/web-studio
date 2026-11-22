import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const MAX_BODY_BYTES = 16 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const ALLOWED_PROJECT_TYPES = new Set([
  "landing",
  "business-website",
  "redesign",
  "other",
]);

type ContactPayload = {
  name: string;
  email: string;
  project_type: string | null;
  message: string;
  website: string;
};

type ContactPayloadResult =
  | { ok: true; value: ContactPayload }
  | { ok: false; message: string };

class PayloadTooLargeError extends Error {}

function jsonResponse(
  body: Record<string, string>,
  status: number,
  headers?: HeadersInit,
): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function characterCount(value: string): number {
  return Array.from(value).length;
}

async function readBoundedBody(request: Request): Promise<string> {
  const contentLength = request.headers.get("content-length");
  if (contentLength !== null) {
    const declaredLength = Number(contentLength);
    if (!Number.isSafeInteger(declaredLength) || declaredLength < 0) {
      throw new TypeError("Invalid content length");
    }
    if (declaredLength > MAX_BODY_BYTES) throw new PayloadTooLargeError();
  }

  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new PayloadTooLargeError();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder("utf-8", { fatal: true }).decode(body);
}

function validatePayload(input: unknown): ContactPayloadResult {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, message: "Request body must be a JSON object." };
  }

  const payload = input as Record<string, unknown>;
  const { name, email, message, website } = payload;
  const rawProjectType = payload.project_type ?? payload.projectType;

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return { ok: false, message: "Required fields are missing or invalid." };
  }
  if (website !== undefined && typeof website !== "string") {
    return { ok: false, message: "Invalid honeypot field." };
  }
  if (rawProjectType !== undefined && rawProjectType !== null && typeof rawProjectType !== "string") {
    return { ok: false, message: "Invalid project type." };
  }

  const normalizedName = name.trim();
  const normalizedEmail = email.trim();
  const normalizedMessage = message.trim();
  const normalizedProjectType = typeof rawProjectType === "string"
    ? rawProjectType.trim() || null
    : null;
  const honeypot = typeof website === "string" ? website.trim() : "";

  if (characterCount(normalizedName) < 2 || characterCount(normalizedName) > 80) {
    return { ok: false, message: "Name must contain 2 to 80 characters." };
  }
  if (
    characterCount(normalizedEmail) > 254 ||
    !EMAIL_PATTERN.test(normalizedEmail)
  ) {
    return { ok: false, message: "Email address is invalid." };
  }
  if (normalizedProjectType !== null && !ALLOWED_PROJECT_TYPES.has(normalizedProjectType)) {
    return { ok: false, message: "Invalid project type." };
  }
  if (characterCount(normalizedMessage) < 20 || characterCount(normalizedMessage) > 2000) {
    return { ok: false, message: "Message must contain 20 to 2000 characters." };
  }

  return {
    ok: true,
    value: {
      name: normalizedName,
      email: normalizedEmail.toLowerCase(),
      project_type: normalizedProjectType,
      message: normalizedMessage,
      website: honeypot,
    },
  };
}

export default {
  fetch: withSupabase({ auth: "publishable" }, async (request, context) => {
    if (request.method !== "POST") {
      return jsonResponse(
        { error: "Method not allowed." },
        405,
        { Allow: "POST, OPTIONS" },
      );
    }

    const contentType = request.headers.get("content-type")?.split(";", 1)[0]
      .trim()
      .toLowerCase();
    if (contentType !== "application/json") {
      return jsonResponse({ error: "Content-Type must be application/json." }, 415);
    }

    let payloadText: string;
    try {
      payloadText = await readBoundedBody(request);
    } catch (error) {
      if (error instanceof PayloadTooLargeError) {
        return jsonResponse({ error: "Request body is too large." }, 413);
      }
      return jsonResponse({ error: "Request body is invalid." }, 400);
    }

    let input: unknown;
    try {
      input = JSON.parse(payloadText);
    } catch {
      return jsonResponse({ error: "Request body must contain valid JSON." }, 400);
    }

    const result = validatePayload(input);
    if (!result.ok) {
      return jsonResponse({ error: result.message }, 400);
    }

    // Discard bot submissions: do not write honeypot values to storage.
    if (result.value.website) {
      return jsonResponse({ error: "Invalid request." }, 400);
    }

    try {
      const { data: submissionStatus, error } = await context.supabaseAdmin.rpc(
        "submit_contact_request",
        {
          p_name: result.value.name,
          p_email: result.value.email,
          p_project_type: result.value.project_type,
          p_message: result.value.message,
        },
      );

      if (error) {
        console.error("submit-contact: atomic submission failed");
        return jsonResponse({ error: "Unable to save the request right now." }, 503);
      }

      switch (submissionStatus) {
        case "accepted":
          return jsonResponse({ message: "Request received." }, 201);
        case "duplicate":
          return jsonResponse({ error: "This request was already received recently." }, 409);
        case "rate_limited":
          return jsonResponse({ error: "Too many requests. Please try again later." }, 429);
        default:
          console.error("submit-contact: unexpected atomic submission status");
          return jsonResponse({ error: "Unable to process the request right now." }, 503);
      }
    } catch {
      console.error("submit-contact: database operation failed");
      return jsonResponse({ error: "Unable to process the request right now." }, 503);
    }
  }),
};
