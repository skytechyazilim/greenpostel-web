import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["tr", "de", "en"],
  defaultLocale: "tr",
  // /tr, /de, /en — locale always in the URL
  localePrefix: "always",
  // Auto-detect from the visitor's browser (Accept-Language header) + cookie.
  // A German browser lands on /de, an English browser on /en, otherwise /tr.
  localeDetection: true
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
