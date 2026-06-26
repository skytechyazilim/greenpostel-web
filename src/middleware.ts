import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

// Detects the browser language on the bare "/" route and redirects the
// visitor to the matching locale (/tr, /de, /en, /fr).
const handle = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const res = handle(req);
  // HTML document responses must not be cached by the Hostinger CDN: Next emits
  // `s-maxage=31536000` for statically prerendered pages, so after a deploy the
  // CDN keeps serving old HTML that references hashed chunks which no longer
  // exist (404 → blank page). Force revalidation for documents. Hashed
  // `/_next/static/*` assets are excluded by the matcher and stay immutable.
  res.headers.set("Cache-Control", "no-cache, must-revalidate");
  return res;
}

export const config = {
  // Skip Next internals, API routes and static files.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
