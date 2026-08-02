// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.
//
// KNOWN LIMITATION: `lastCapturedError` is a module-level global, which is NOT
// thread-safe. Under concurrent SSR requests (or multiple isolates/workers),
// an error recorded by request A can be consumed by request B, or dropped when
// a newer error overwrites it. This is an acknowledged, best-effort mechanism
// for the current h3 setup: h3 swallows in-handler throws before any
// request-scoped context is reachable from server.ts, and plumbing the error
// through the request context would require restructuring the h3 request
// pipeline (e.g. a custom onError hook or wrapping the server entry with
// per-request error storage). It is only relied upon to recover a stack trace
// for logging — it never affects the response returned to the client — so the
// race is non-fatal. Revisit if error recovery becomes critical.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
