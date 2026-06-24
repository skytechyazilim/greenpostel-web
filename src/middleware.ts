import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Detects the browser language on the bare "/" route and redirects the
// visitor to the matching locale (/tr, /de or /en).
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and static files.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};
