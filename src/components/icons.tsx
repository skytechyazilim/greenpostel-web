import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
};

export const IconUpload = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M12 3v13" />
    <path d="m7 8 5-5 5 5" />
  </svg>
);

export const IconLock = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15.5" r="1.3" />
  </svg>
);

export const IconRoute = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="19" r="2.4" />
    <circle cx="18" cy="5" r="2.4" />
    <path d="M8.4 19H14a3.6 3.6 0 0 0 0-7.2H10A3.6 3.6 0 0 1 10 4.6h5.6" />
  </svg>
);

export const IconPrinter = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9V3h12v6" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="7" rx="1" />
  </svg>
);

export const IconTruck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 6.5A1.5 1.5 0 0 1 3.5 5H14a1 1 0 0 1 1 1v9H3.5A1.5 1.5 0 0 1 2 13.5Z" />
    <path d="M15 8h3.2a2 2 0 0 1 1.7 1l1.6 2.6a2 2 0 0 1 .3 1.1V15h-7" />
    <circle cx="6.5" cy="18" r="2" />
    <circle cx="17.5" cy="18" r="2" />
  </svg>
);

export const IconQr = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4M17.5 21h.01" />
  </svg>
);

export const IconLeaf = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M11 20A7 7 0 0 1 4 13c0-5 4.5-8.5 16-8.5C20 16 15.5 20 11 20Z" />
    <path d="M4 21c4-7 8-9.5 14-11" />
  </svg>
);

export const IconBolt = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12Z" />
  </svg>
);

export const IconUsers = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M16 19v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V19" />
    <circle cx="9" cy="7" r="3.2" />
    <path d="M22 19v-1.5a4 4 0 0 0-3-3.8" />
    <path d="M16 3.6a4 4 0 0 1 0 7.4" />
  </svg>
);

export const IconEye = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconAccess = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="4.5" r="1.6" />
    <path d="M4 8.5c2.5 1 5 1.5 8 1.5s5.5-.5 8-1.5" />
    <path d="M12 10v5" />
    <path d="m8.5 20 3.5-5 3.5 5" />
  </svg>
);

export const IconGauge = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 14 16 9" />
    <circle cx="12" cy="14" r="1" />
    <path d="M4.2 18a9 9 0 1 1 15.6 0" />
  </svg>
);

export const IconGlobe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" />
  </svg>
);

export const IconBuilding = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="3" width="14" height="18" rx="1.5" />
    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
    <path d="M5 21h14" />
  </svg>
);

export const IconLandmark = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21h18" />
    <path d="M4 10h16" />
    <path d="m12 3 8 4H4Z" />
    <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
  </svg>
);

export const IconShieldCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.4 3 7.7 7 9 4-1.3 7-4.6 7-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconStore = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 9.5 5.2 4h13.6L20 9.5" />
    <path d="M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
    <path d="M5 11v9h14v-9" />
    <path d="M9 20v-5h4v5" />
  </svg>
);

export const IconPackage = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" />
    <path d="m4 7.5 8 4.5 8-4.5" />
    <path d="M12 12v9" />
    <path d="m8 5.2 8 4.6" />
  </svg>
);

export const IconBrowser = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18" />
    <path d="M6.5 6.5h.01M9 6.5h.01" />
  </svg>
);

export const IconMonitor = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12 5 5L20 6" />
  </svg>
);

export const IconChevronDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconTarget = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" />
  </svg>
);

export const IconHandshake = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m11 12 2 2 4-4" />
    <path d="M3 11.5 8 7l3 2.5" />
    <path d="m13 6 3-1 5 4.5-3.5 4-2-2" />
    <path d="M3 11.5 6.5 16l3.5-1" />
  </svg>
);

export const IconCrown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 8l3.5 3L12 5l5.5 6L21 8l-1.5 10h-15Z" />
    <path d="M4.5 18h15" />
  </svg>
);
