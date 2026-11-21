// 집안일 아이콘: 재료 아이콘(IngredientIcon)과 같은 48x48 라인 드로잉 스타일.

const INK = "#4A3426";

export const GUIDE_ICONS = {
  vacuum: { label: "청소기", color: "#C9776A" },
  mop: { label: "걸레질", color: "#A9BFC9" },
  duster: { label: "먼지", color: "#E9C893" },
  sink: { label: "싱크대", color: "#CFE2E8" },
  toilet: { label: "변기", color: "#F4F1EA" },
  drain: { label: "배수구", color: "#C8CDD0" },
  spray: { label: "세정제", color: "#9CC9A4" },
  washer: { label: "세탁기", color: "#E6EEF0" },
  towel: { label: "수건", color: "#F2C7B5" },
  socks: { label: "양말", color: "#B9CF8A" },
  shirt: { label: "옷", color: "#F7F3E8" },
  jeans: { label: "청바지", color: "#7E9BB8" },
  sweater: { label: "니트", color: "#D9A07A" },
  padding: { label: "패딩", color: "#5F6E7E" },
  bedding: { label: "이불", color: "#E7D6EC" },
  plant: { label: "화초", color: "#8DB06E" },
  recycle: { label: "분리수거", color: "#A7C08A" },
  trash: { label: "쓰레기", color: "#B8A48C" },
  fridge: { label: "냉장고", color: "#EEF0F0" },
  fan: { label: "필터", color: "#D8E4EA" },
  pot: { label: "요리", color: "#B75D38" },
  house: { label: "집안일", color: "#F6E7C1" },
} as const;

export type GuideIconName = keyof typeof GUIDE_ICONS;

function Shape({ name, c }: { name: GuideIconName; c: string }) {
  switch (name) {
    case "vacuum":
      return (
        <>
          <path d="M30 6l-8 28" fill="none" strokeWidth="2.4" />
          <path d="M14 34h14l3 5H11Z" fill={c} />
          <rect x="22" y="12" width="14" height="16" rx="5" fill={c} />
          <circle cx="15" cy="40" r="2.5" fill="#fff" />
          <circle cx="27" cy="40" r="2.5" fill="#fff" />
        </>
      );
    case "mop":
      return (
        <>
          <path d="M32 5L22 32" fill="none" strokeWidth="2.4" />
          <path d="M10 32h24l2 8H8Z" fill={c} />
          <path d="M12 36h20" fill="none" strokeOpacity=".5" />
          <path d="M6 44c4-1 8 1 12 0s8-1 12 0 8 1 12 0" fill="none" stroke="#7FA9BC" />
        </>
      );
    case "duster":
      return (
        <>
          <path d="M30 26l10 16" fill="none" strokeWidth="2.6" />
          <path d="M14 8c8-2 18 4 18 14 0 4-3 6-6 6-8 0-16-8-15-16 0-2 1-4 3-4Z" fill={c} />
          <path d="M17 12c3 2 5 6 6 10M22 10c3 3 5 7 5 11" fill="none" strokeOpacity=".5" />
          <circle cx="10" cy="34" r="1.2" fill={INK} stroke="none" />
          <circle cx="16" cy="40" r="1" fill={INK} stroke="none" />
          <circle cx="7" cy="42" r="1" fill={INK} stroke="none" />
        </>
      );
    case "sink":
      return (
        <>
          <path d="M24 20V9c0-2 2-4 5-4s5 2 5 5" fill="none" strokeWidth="2.4" />
          <path d="M6 22h36l-3 14c-1 3-3 5-6 5H15c-3 0-5-2-6-5Z" fill={c} />
          <path d="M34 11v4" fill="none" stroke="#7FA9BC" strokeDasharray="1.5 2.5" />
        </>
      );
    case "toilet":
      return (
        <>
          <rect x="12" y="5" width="20" height="13" rx="2" fill={c} />
          <path d="M8 21h30c0 7-5 12-12 13l2 8H16l2-8c-6-1-10-6-10-13Z" fill={c} />
          <ellipse cx="23" cy="21" rx="15" ry="3" fill="#fff" />
        </>
      );
    case "drain":
      return (
        <>
          <circle cx="24" cy="24" r="17" fill={c} />
          <circle cx="24" cy="24" r="10" fill="#fff" />
          <path d="M18 24h12M24 18v12M20 20l8 8M28 20l-8 8" fill="none" strokeOpacity=".6" />
          <path d="M36 10c-4 2-6 6-4 9" fill="none" stroke="#3A2A20" strokeWidth="1.2" />
        </>
      );
    case "spray":
      return (
        <>
          <path d="M18 18h14l2 22c0 2-1 3-3 3H19c-2 0-3-1-3-3Z" fill={c} />
          <path d="M18 18v-6h12l6 4h-6v2" fill="#fff" />
          <rect x="19" y="26" width="12" height="8" rx="1.5" fill="#fff" fillOpacity=".8" />
          <path d="M39 13l4-2M39 16h5M39 19l4 2" fill="none" />
        </>
      );
    case "washer":
      return (
        <>
          <rect x="8" y="5" width="32" height="38" rx="3" fill={c} />
          <path d="M8 13h32" fill="none" />
          <circle cx="14" cy="9" r="1.3" fill={INK} stroke="none" />
          <circle cx="19" cy="9" r="1.3" fill={INK} stroke="none" />
          <circle cx="24" cy="28" r="10" fill="#fff" />
          <path d="M16 30c3-3 6 1 8-1s5-3 8-1" fill="none" stroke="#7FA9BC" />
        </>
      );
    case "towel":
      return (
        <>
          <path d="M8 10h32" fill="none" strokeWidth="2.4" />
          <path d="M12 10h24v30H12Z" fill={c} />
          <path d="M12 32h24M12 35h24" fill="none" strokeOpacity=".5" />
          <path d="M18 10v30" fill="none" strokeOpacity=".3" />
        </>
      );
    case "socks":
      return (
        <>
          <path d="M14 6h10v18l8 8c3 3 1 9-4 9-2 0-3-1-5-2l-8-8c-2-2-1-4-1-6Z" fill={c} />
          <path d="M14 11h10" fill="none" strokeOpacity=".5" />
          <path d="M26 6h8v16l5 5" fill="none" strokeOpacity=".5" />
        </>
      );
    case "shirt":
      return (
        <>
          <path d="M18 6l-11 6 4 9 5-2v23h16V19l5 2 4-9-11-6c-1 3-3 5-6 5s-5-2-6-5Z" fill={c} />
          <path d="M24 11v31" fill="none" strokeOpacity=".3" />
        </>
      );
    case "jeans":
      return (
        <>
          <path d="M13 6h22l2 36h-9l-4-24-4 24h-9Z" fill={c} />
          <path d="M13 11h22M24 11v7" fill="none" strokeOpacity=".6" />
          <path d="M16 11c0 3 2 5 5 5M32 11c0 3-2 5-5 5" fill="none" stroke="#E9C893" />
        </>
      );
    case "sweater":
      return (
        <>
          <path d="M17 7l-10 6 2 26h6l1-20v23h16V19l1 20h6l2-26-10-6c-1 3-4 5-7 5s-6-2-7-5Z" fill={c} />
          <path d="M16 36h16M9 34h6M33 34h6" fill="none" strokeOpacity=".5" />
          <path d="M20 22l4 4 4-4M20 28l4 4 4-4" fill="none" strokeOpacity=".4" />
        </>
      );
    case "padding":
      return (
        <>
          <path d="M16 6l-8 6v28h10V20h12v20h10V12l-8-6c-2 3-5 4-8 4s-6-1-8-4Z" fill={c} />
          <path d="M8 19h10M30 19h10M8 27h10M30 27h10M8 34h10M30 34h10M18 26h12M18 33h12" fill="none" stroke="#fff" strokeOpacity=".5" />
          <path d="M24 10v32" fill="none" />
        </>
      );
    case "bedding":
      return (
        <>
          <path d="M5 26c0-4 3-6 7-6h24c4 0 7 2 7 6v10H5Z" fill={c} />
          <rect x="9" y="12" width="14" height="9" rx="4" fill="#fff" />
          <path d="M5 36v5M43 36v5" fill="none" />
          <path d="M5 30h38" fill="none" strokeOpacity=".4" />
        </>
      );
    case "plant":
      return (
        <>
          <path d="M24 28c0-8 0-14 0-18" fill="none" />
          <path d="M24 18c-8 1-13-3-14-10 7-1 13 3 14 10Z" fill={c} />
          <path d="M24 22c7 0 12-4 13-11-7 0-12 4-13 11Z" fill={c} />
          <path d="M14 28h20l-3 14H17Z" fill="#D9805B" />
          <path d="M13 28h22" fill="none" strokeWidth="2.4" />
        </>
      );
    case "recycle":
      return (
        <>
          <path d="M14 14h20l-2 28H16Z" fill={c} />
          <path d="M11 14h26M20 14v-4h8v4" fill="none" />
          <path d="M20 24l4-4 4 4M24 20v10M19 34h10" fill="none" stroke="#fff" strokeWidth="2.2" />
        </>
      );
    case "trash":
      return (
        <>
          <path d="M13 16h22l-3 26H16Z" fill={c} />
          <path d="M10 16h28" fill="none" strokeWidth="2.4" />
          <path d="M19 12c0-3 2-5 5-5s5 2 5 5" fill="none" />
          <path d="M19 22v14M24 22v14M29 22v14" fill="none" strokeOpacity=".5" />
        </>
      );
    case "fridge":
      return (
        <>
          <rect x="12" y="4" width="24" height="40" rx="3" fill={c} />
          <path d="M12 18h24" fill="none" />
          <path d="M16 9v5M16 23v8" fill="none" strokeWidth="2.4" />
        </>
      );
    case "fan":
      return (
        <>
          <rect x="7" y="9" width="34" height="30" rx="3" fill={c} />
          {[15, 20, 25, 30].map((y) => (
            <path key={y} d={`M11 ${y}h26`} fill="none" strokeOpacity=".5" />
          ))}
          <path d="M14 43c3-2 6-2 9 0M26 43c3-2 6-2 9 0" fill="none" stroke="#9C8877" />
        </>
      );
    case "pot":
      return (
        <>
          <path d="M8 20h32v14c0 5-4 8-9 8H17c-5 0-9-3-9-8Z" fill={c} />
          <path d="M5 20h38M4 24h4M40 24h4" fill="none" strokeWidth="2.2" />
          <path d="M20 16c0-2 2-3 4-3s4 1 4 3" fill="none" />
          <path d="M17 10c0-3 3-3 3-6M27 10c0-3 3-3 3-6" fill="none" strokeOpacity=".5" />
        </>
      );
    case "house":
    default:
      return (
        <>
          <path d="M6 22L24 7l18 15" fill="none" strokeWidth="2.2" />
          <path d="M11 19v22h26V19L24 9Z" fill={c} />
          <rect x="20" y="28" width="8" height="13" fill="#fff" />
        </>
      );
  }
}

export function GuideIcon({ name, size = 48, className }: { name: GuideIconName; size?: number; className?: string }) {
  const def = GUIDE_ICONS[name] ?? GUIDE_ICONS.house;
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke={INK}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <Shape name={name} c={def.color} />
    </svg>
  );
}
