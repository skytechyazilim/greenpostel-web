"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { IconPhone, IconMail, IconGlobe, IconArrowRight } from "./icons";

const PHONE = "+49 162 325 3946";
const EMAIL = "a.bayalan@greenpostel.com";
const WEB = "www.greenpostel.de";

export function Contact() {
  const t = useTranslations("contact");
  const reduce = useReducedMotion();

  const items = [
    { icon: <IconPhone className="h-5 w-5" />, label: t("phoneLabel"), value: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
    { icon: <IconMail className="h-5 w-5" />, label: t("emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: <IconGlobe className="h-5 w-5" />, label: t("webLabel"), value: WEB, href: `https://${WEB}` }
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="container-x">
        <div className="glass relative overflow-hidden p-8 sm:p-12 lg:p-16">
          {/* atmosphere */}
          <div className="pointer-events-none absolute inset-0 aurora opacity-70" />
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-leaf-500/15 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <Reveal>
                <span className="eyebrow">{t("eyebrow")}</span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tightest text-white sm:text-4xl lg:text-5xl">
                  {t("title")}
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300/80">
                  {t("text")}
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition-colors duration-200 hover:bg-leaf-400"
                >
                  {t("cta")}
                  <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </Reveal>
            </div>

            <div className="space-y-3">
              {items.map((c, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <a
                    href={c.href}
                    target={c.label === t("webLabel") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors duration-200 hover:border-leaf-400/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-500/12 text-leaf-300 ring-1 ring-leaf-400/20">
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{c.label}</div>
                      <div className="truncate font-medium text-white">{c.value}</div>
                    </div>
                    <IconArrowRight className="ml-auto h-4 w-4 text-slate-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-leaf-300" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
