"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import {
  IconBuilding,
  IconLandmark,
  IconShieldCheck,
  IconStore,
  IconPackage,
  IconGauge,
  IconLock,
  IconLeaf,
  IconBolt,
  IconCheck
} from "./icons";

const SEG_ICONS = [IconBuilding, IconLandmark, IconShieldCheck, IconStore, IconPackage];
const SOL_ICONS = [IconGauge, IconLock, IconLeaf, IconBolt];

type Segment = { title: string; needs: string; expect: string };
type Solution = { title: string; desc: string };

export function Customers() {
  const t = useTranslations("customers");
  const segments = t.raw("segments") as Segment[];
  const solutions = t.raw("solutions") as Solution[];
  const [active, setActive] = useState(0);
  const seg = segments[active];

  return (
    <section id="customers" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} center />

        {/* segment tabs */}
        <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2">
          {segments.map((s, i) => {
            const Icon = SEG_ICONS[i % SEG_ICONS.length];
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-ink-950" : "text-slate-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="segPill"
                    className="absolute inset-0 rounded-full bg-leaf-400"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* active segment panel */}
        <div className="mx-auto mt-8 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35 }}
              className="glass grid gap-6 p-7 sm:grid-cols-2 sm:p-9"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf-300">
                  {seg.title}
                </span>
                <h3 className="mt-3 font-display text-sm font-semibold text-slate-400">
                  {t("eyebrow")}
                </h3>
                <p className="mt-1 text-base leading-relaxed text-slate-200">{seg.needs}</p>
              </div>
              <div className="rounded-2xl border border-leaf-400/15 bg-leaf-500/[0.05] p-5">
                <div className="flex items-center gap-2 text-leaf-200">
                  <IconCheck className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                    {t("solutionsTitle")}
                  </span>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-200">{seg.expect}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* solutions grid */}
        <div className="mt-16">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-bold text-white">
              {t("solutionsTitle")}
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s, i) => {
              const Icon = SOL_ICONS[i % SOL_ICONS.length];
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="glass group h-full p-6 transition-colors duration-300 hover:border-leaf-400/30 hover:bg-white/[0.05]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-leaf-500/12 text-leaf-300 ring-1 ring-leaf-400/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-5 font-display text-base font-semibold text-white">
                      {s.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
