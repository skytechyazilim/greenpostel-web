"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { IconArrowRight } from "./icons";

const LINKS = [
  { id: "whatis", href: "#whatis" },
  { id: "architecture", href: "#architecture" },
  { id: "values", href: "#values" },
  { id: "goals", href: "#goals" },
  { id: "customers", href: "#customers" }
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.5, 0.2, 1] }}
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border-white/10 bg-ink-900/80 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.7)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="flex cursor-pointer items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="GreenPostel Global"
            width={44}
            height={44}
            className="h-9 w-9 sm:h-10 sm:w-10"
            priority
          />
          <span className="font-display text-base font-bold tracking-tight text-white sm:text-lg">
            Green<span className="text-leaf-400">Postel</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className="cursor-pointer rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
            >
              {t(l.id)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="group hidden cursor-pointer items-center gap-1.5 rounded-full bg-leaf-500 px-4 py-2 text-sm font-semibold text-ink-950 transition-colors duration-200 hover:bg-leaf-400 sm:inline-flex"
          >
            {t("cta")}
            <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex cursor-pointer flex-col gap-1.5 rounded-lg p-2 lg:hidden"
          >
            <span
              className={`h-0.5 w-5 bg-white transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`h-0.5 w-5 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-5 bg-white transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-ink-850/95 p-3 backdrop-blur-xl lg:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5"
              >
                {t(l.id)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 block cursor-pointer rounded-xl bg-leaf-500 px-4 py-3 text-center text-sm font-semibold text-ink-950"
            >
              {t("cta")}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
