"use client";

import { useTranslations } from "next-intl";
import { Reveal, SectionHeading } from "./Reveal";
import { IconBolt, IconShieldCheck, IconLeaf } from "./icons";

export function WhatIs() {
  const t = useTranslations("whatis");

  const pills = [
    { icon: <IconBolt className="h-5 w-5" />, title: t("pill1Title"), desc: t("pill1Desc") },
    { icon: <IconShieldCheck className="h-5 w-5" />, title: t("pill2Title"), desc: t("pill2Desc") },
    { icon: <IconLeaf className="h-5 w-5" />, title: t("pill3Title"), desc: t("pill3Desc") }
  ];

  return (
    <section id="whatis" className="relative py-24 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </div>
        <div className="space-y-5 lg:pt-16">
          <Reveal>
            <p className="text-base leading-relaxed text-slate-300/85 sm:text-lg">{t("p1")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-slate-300/85 sm:text-lg">{t("p2")}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-x mt-16 grid gap-5 sm:grid-cols-3">
        {pills.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="glass group h-full p-6 transition-colors duration-300 hover:border-leaf-400/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-500/12 text-leaf-300 ring-1 ring-leaf-400/20">
                {p.icon}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
