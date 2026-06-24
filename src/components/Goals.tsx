"use client";

import { useTranslations } from "next-intl";
import { Reveal, SectionHeading } from "./Reveal";
import { IconHandshake, IconBuilding, IconCrown } from "./icons";

const ICONS = [IconHandshake, IconBuilding, IconCrown];

type Goal = { title: string; desc: string };

export function Goals() {
  const t = useTranslations("goals");
  const items = t.raw("items") as Goal[];

  return (
    <section id="goals" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((g, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="glass group relative h-full overflow-hidden p-7 transition-colors duration-300 hover:border-leaf-400/30">
                  <span className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-bold text-white/[0.04] transition-colors duration-300 group-hover:text-leaf-500/10">
                    0{i + 1}
                  </span>
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-500/12 text-leaf-300 ring-1 ring-leaf-400/25">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-white">{g.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{g.desc}</p>
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
