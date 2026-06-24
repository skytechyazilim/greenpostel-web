"use client";

import { useTranslations } from "next-intl";
import { Reveal, SectionHeading } from "./Reveal";
import {
  IconBolt,
  IconLeaf,
  IconUsers,
  IconAccess,
  IconEye,
  IconGauge
} from "./icons";

const ICONS = [IconBolt, IconLeaf, IconUsers, IconAccess, IconEye, IconGauge];

type ValueItem = { title: string; desc: string };

export function Values() {
  const t = useTranslations("values");
  const items = t.raw("items") as ValueItem[];

  return (
    <section id="values" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} center />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((v, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className="glass group flex h-full items-start gap-4 p-6 transition-colors duration-300 hover:border-leaf-400/30 hover:bg-white/[0.05]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-leaf-500/12 text-leaf-300 ring-1 ring-leaf-400/20 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
