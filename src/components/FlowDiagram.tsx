"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { IconUsers, IconRoute, IconPrinter, IconTruck, IconLock } from "./icons";

// viewBox is 100 x VB_H; container aspect matches so HTML nodes align with SVG.
const VB_H = 66;

// Station coordinates, vertically centered inside the box.
const STATIONS = {
  user: { x: 17, y: 44 },
  center: { x: 50, y: 12 },
  print: { x: 82, y: 32 },
  postal: { x: 50, y: 54 }
};

const EDGES = [
  "M17,44 C21,28 34,17 50,12",
  "M50,12 C66,15 78,21 82,32",
  "M82,32 C80,45 66,52 50,54",
  "M50,54 C36,54 21,52 17,44"
];

const LOOP =
  "M17,44 C21,28 34,17 50,12 C66,15 78,21 82,32 C80,45 66,52 50,54 C36,54 21,52 17,44";

function px(v: number) {
  return `${(v / 100) * 100}%`;
}
function py(v: number) {
  return `${(v / VB_H) * 100}%`;
}

function Node({
  x,
  y,
  icon,
  label,
  delay,
  reduce
}: {
  x: number;
  y: number;
  icon: ReactNode;
  label: string;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{ left: px(x), top: py(y) }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative">
        {!reduce && (
          <span className="absolute inset-0 animate-ping rounded-2xl bg-leaf-400/20 [animation-duration:3s]" />
        )}
        <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-leaf-400/30 bg-ink-850/90 text-leaf-300 shadow-lg backdrop-blur sm:h-12 sm:w-12">
          {icon}
        </div>
      </div>
      <span className="mt-1.5 whitespace-nowrap rounded-md bg-ink-950/70 px-1.5 text-[10px] font-medium text-slate-300 backdrop-blur sm:text-[11px]">
        {label}
      </span>
    </motion.div>
  );
}

function EdgeLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <span
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-leaf-400/25 bg-ink-900/80 px-2 py-0.5 font-mono text-[9px] font-semibold text-leaf-200 backdrop-blur sm:text-[10px]"
      style={{ left: px(x), top: py(y) }}
    >
      {text}
    </span>
  );
}

export function FlowDiagram() {
  const t = useTranslations("architecture.diagram");
  const reduce = useReducedMotion();

  return (
    <div className="glass relative aspect-[50/33] w-full overflow-hidden p-2">
      <div className="pointer-events-none absolute inset-0 aurora opacity-50" />

      <svg
        viewBox={`0 0 100 ${VB_H}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0,1 L8,5 L0,9" fill="none" stroke="#32d583" strokeWidth="1.6" />
          </marker>
        </defs>

        {/* faint base loop */}
        <path d={LOOP} stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />

        {/* drawn edges with arrowheads */}
        {EDGES.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#12b76a"
            strokeWidth="0.7"
            strokeLinecap="round"
            markerEnd="url(#arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.45, ease: "easeInOut" }}
          />
        ))}

        {/* travelling encrypted packet */}
        {!reduce && (
          <>
            <circle r="2.2" fill="#6ce9a6" opacity="0.25">
              <animateMotion dur="6s" repeatCount="indefinite" path={LOOP} />
            </circle>
            <circle r="1.3" fill="#d1fadf">
              <animateMotion dur="6s" repeatCount="indefinite" path={LOOP} />
            </circle>
          </>
        )}
      </svg>

      {/* stations */}
      <Node x={STATIONS.user.x} y={STATIONS.user.y} delay={0.1} reduce={reduce} icon={<IconUsers className="h-5 w-5" />} label={t("user")} />
      <Node x={STATIONS.center.x} y={STATIONS.center.y} delay={0.25} reduce={reduce} icon={<IconRoute className="h-5 w-5" />} label={t("center")} />
      <Node x={STATIONS.print.x} y={STATIONS.print.y} delay={0.4} reduce={reduce} icon={<IconPrinter className="h-5 w-5" />} label={t("print")} />
      <Node x={STATIONS.postal.x} y={STATIONS.postal.y} delay={0.55} reduce={reduce} icon={<IconTruck className="h-5 w-5" />} label={t("postal")} />

      {/* edge labels */}
      <EdgeLabel x={29} y={24} text={t("e1")} />
      <EdgeLabel x={70} y={17} text={t("e2")} />
      <EdgeLabel x={70} y={46} text={t("e3")} />

      {/* security badge */}
      <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 backdrop-blur">
        <IconLock className="h-3 w-3 text-leaf-300" />
        <span className="text-[10px] font-semibold text-slate-300">End-to-End</span>
      </div>
    </div>
  );
}
