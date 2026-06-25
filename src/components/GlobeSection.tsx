"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { SectionHeading } from "./Reveal";

// three.js touches window/WebGL on load — keep it off the server bundle.
const GlobeNetwork = dynamic(
  () => import("./GlobeNetwork").then((m) => m.GlobeNetwork),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto aspect-square w-full max-w-[820px] animate-pulse rounded-[2rem] bg-leaf-500/[0.04]" />
    )
  }
);

export function GlobeSection() {
  const t = useTranslations("globe");

  return (
    <section id="network" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          intro={t("intro")}
          center
        />
        <div className="mt-12">
          <GlobeNetwork />
          <p className="mt-6 text-center text-[12.5px] font-medium text-slate-400">
            {t("hint")}
          </p>
        </div>
      </div>
    </section>
  );
}
