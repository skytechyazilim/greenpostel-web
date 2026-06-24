"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, routing } from "@/i18n/routing";
import { IconChevronDown } from "./icons";

const FLAG: Record<string, string> = { tr: "TR", de: "DE", en: "EN" };

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("lang");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function change(next: string) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-sm font-semibold text-slate-200 transition-colors duration-200 hover:border-leaf-400/50 hover:text-white"
      >
        <span className="tabular-nums">{FLAG[locale]}</span>
        <IconChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-white/10 bg-ink-850/95 p-1.5 shadow-2xl backdrop-blur-xl"
        >
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => change(l)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors duration-200 ${
                  l === locale
                    ? "bg-leaf-500/15 text-leaf-200"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{t(l)}</span>
                <span className="text-xs font-semibold text-slate-500">{FLAG[l]}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
