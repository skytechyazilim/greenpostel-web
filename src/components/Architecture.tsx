"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { FlowDiagram } from "./FlowDiagram";
import {
  IconUpload,
  IconLock,
  IconRoute,
  IconPrinter,
  IconTruck,
  IconQr,
  IconBrowser,
  IconMonitor,
  IconShieldCheck,
  IconCheck
} from "./icons";

const STEP_ICONS = [IconUpload, IconLock, IconRoute, IconPrinter, IconTruck, IconQr];

type Step = { title: string; desc: string };

export function Architecture() {
  const t = useTranslations("architecture");
  const reduce = useReducedMotion();
  const steps = t.raw("steps") as Step[];

  return (
    <section id="architecture" className="relative overflow-hidden py-24 sm:py-28">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0 aurora opacity-60" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
          center
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* animated flow rail */}
          <div className="relative pl-14 sm:pl-16">
            {/* rail base */}
            <div className="absolute left-[26px] top-2 bottom-2 w-px bg-white/10 sm:left-[30px]" />
            {/* rail progress drawn on scroll */}
            <motion.div
              className="absolute left-[26px] top-2 w-px bg-gradient-to-b from-leaf-300 via-leaf-500 to-leaf-300/0 sm:left-[30px]"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            {/* travelling packet */}
            {!reduce && (
              <motion.span
                className="absolute left-[26px] h-3 w-3 -translate-x-1/2 rounded-full bg-leaf-200 shadow-[0_0_14px_4px_rgba(108,233,166,0.8)] sm:left-[30px]"
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <ul className="space-y-7">
              {steps.map((s, i) => {
                const Icon = STEP_ICONS[i % STEP_ICONS.length];
                return (
                  <Reveal key={i} delay={i * 0.06}>
                    <li className="relative">
                      {/* node */}
                      <span className="absolute -left-14 top-0 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-leaf-400/25 bg-ink-850 text-leaf-300 shadow-lg sm:-left-16 sm:h-[60px] sm:w-[60px]">
                        <Icon className="h-6 w-6" />
                        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-leaf-500 text-[10px] font-bold text-ink-950">
                          {i + 1}
                        </span>
                      </span>
                      <div className="glass p-5">
                        <h3 className="font-display text-base font-semibold text-white sm:text-lg">
                          {s.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* right column: animated flow diagram + security + options */}
          <div className="space-y-6">
            <Reveal>
              <FlowDiagram />
            </Reveal>

            {/* security */}
            <Reveal delay={0.1}>
              <div className="glass relative overflow-hidden p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-500/12 text-leaf-300 ring-1 ring-leaf-400/25">
                    <IconShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {t("securityTitle")}
                  </h3>
                  <span className="ml-auto rounded-full border border-leaf-400/30 bg-leaf-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-leaf-200">
                    AES 128/256/512
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300/80">
                  {t("securityText")}
                </p>
              </div>
            </Reveal>

            {/* usage options */}
            <Reveal delay={0.18}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: <IconBrowser className="h-5 w-5" />, title: t("option1Title"), desc: t("option1Desc") },
                  { icon: <IconMonitor className="h-5 w-5" />, title: t("option2Title"), desc: t("option2Desc") }
                ].map((o, i) => (
                  <div
                    key={i}
                    className="glass p-5 transition-colors duration-300 hover:border-leaf-400/30"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-leaf-300 ring-1 ring-white/10">
                      {o.icon}
                    </div>
                    <h4 className="mt-4 font-display text-sm font-semibold text-white">{o.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{o.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex items-center gap-3 rounded-2xl border border-leaf-400/20 bg-leaf-500/[0.06] px-5 py-4">
                <IconCheck className="h-5 w-5 shrink-0 text-leaf-300" />
                <p className="text-sm font-medium text-leaf-100">{t("formatNote")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
