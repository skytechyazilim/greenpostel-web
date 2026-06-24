"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { IconArrowRight, IconLeaf, IconShieldCheck, IconLock } from "./icons";

const ease = [0.21, 0.5, 0.2, 1] as const;

function OrbitVisual() {
  const reduce = useReducedMotion();
  const nodes = [0, 60, 120, 180, 240, 300];

  return (
    <div className="relative mx-auto aspect-square w-[min(78vw,30rem)]">
      {/* glow */}
      <div className="absolute inset-[12%] rounded-full bg-leaf-500/20 blur-3xl" />

      {/* rotating rings */}
      {[0, 1, 2].map((i) => {
        const size = 100 - i * 16;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full border border-leaf-400/15"
            style={{
              top: `${(100 - size) / 2}%`,
              left: `${(100 - size) / 2}%`,
              width: `${size}%`,
              height: `${size}%`
            }}
            animate={reduce ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 28 + i * 10, repeat: Infinity, ease: "linear" }}
          >
            {/* one travelling node per ring */}
            <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-leaf-300 shadow-[0_0_12px_3px_rgba(108,233,166,0.7)]" />
          </motion.div>
        );
      })}

      {/* dotted constellation */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map((deg, i) => {
          const r = 44;
          const x = 50 + r * Math.cos((deg * Math.PI) / 180);
          const y = 50 + r * Math.sin((deg * Math.PI) / 180);
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={0.9}
              className="fill-leaf-200/70"
              animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            />
          );
        })}
      </svg>

      {/* center logo */}
      <motion.div
        className="absolute inset-[26%] flex items-center justify-center"
        animate={reduce ? undefined : { y: [-6, 6, -6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/logo.png"
          alt="GreenPostel Global"
          width={400}
          height={400}
          priority
          className="h-full w-full object-contain drop-shadow-[0_0_30px_rgba(18,183,106,0.45)]"
        />
      </motion.div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } }
  };

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-32 sm:pt-40 lg:pb-24">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="eyebrow">
            <IconLeaf className="h-3.5 w-3.5" />
            {t("badge")}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-tightest text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t("titleTop")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
            <br className="hidden sm:block" /> {t("titleBottom")}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300/85 sm:text-lg"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#architecture"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition-colors duration-200 hover:bg-leaf-400"
            >
              {t("ctaPrimary")}
              <IconArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-leaf-400/50 hover:bg-white/5"
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>

          <motion.dl variants={item} className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[
              { icon: <IconLeaf className="h-4 w-4" />, value: "%100", label: t("stat1Label") },
              { icon: <IconShieldCheck className="h-4 w-4" />, value: "%100", label: t("stat2Label") },
              { icon: <IconLock className="h-4 w-4" />, value: t("stat3Value"), label: t("stat3Label") }
            ].map((s, i) => (
              <div key={i} className="glass px-4 py-4">
                <div className="flex items-center gap-1.5 text-leaf-300">{s.icon}</div>
                <dd className="mt-2 font-display text-2xl font-bold text-white">{s.value}</dd>
                <dt className="text-xs text-slate-400">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.25 }}
        >
          <OrbitVisual />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="container-x mt-10 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="inline-block h-8 w-px bg-gradient-to-b from-leaf-400 to-transparent"
        />
        {t("scroll")}
      </motion.div>
    </section>
  );
}
