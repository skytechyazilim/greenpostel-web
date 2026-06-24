"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { IconTarget, IconEye } from "./icons";

export function MissionVision() {
  const t = useTranslations("mission");

  const cards = [
    { icon: <IconTarget className="h-6 w-6" />, title: t("missionTitle"), text: t("missionText") },
    { icon: <IconEye className="h-6 w-6" />, title: t("visionTitle"), text: t("visionText") }
  ];

  return (
    <section className="relative py-12 sm:py-16">
      <div className="container-x">
        <span className="eyebrow">{t("eyebrow")}</span>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div className="glass relative h-full overflow-hidden p-8 sm:p-10">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-leaf-500/10 blur-2xl" />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-500/12 text-leaf-300 ring-1 ring-leaf-400/25">
                    {c.icon}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-white">{c.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-slate-300/80">{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
