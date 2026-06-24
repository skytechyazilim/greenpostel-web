"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = 2026;

  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="container-x flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="GreenPostel Global" width={40} height={40} className="h-10 w-10" />
          <div>
            <div className="font-display text-sm font-bold text-white">{t("company")}</div>
            <div className="text-xs text-slate-500">{t("tagline")}</div>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          © {year} {t("company")} · {t("rights")}
        </div>
      </div>
    </footer>
  );
}
