// 재료 아이콘: 48x48 라인 드로잉 + 재료별 채움색.
// 모양(shape)은 공유하고 색만 바꿔서 재료마다 구분한다.

export type IconShape =
  | "meat" | "drumstick" | "fish" | "driedFish" | "clam" | "shrimp" | "squid" | "anchovy"
  | "egg" | "tofu" | "onion" | "scallion" | "garlic" | "minced" | "ginger" | "chili"
  | "radish" | "potato" | "carrot" | "zucchini" | "eggplant" | "mushroom" | "sprout"
  | "leaf" | "fern" | "root" | "cabbage" | "kimchi" | "seaweed" | "kelp" | "fruit" | "nut"
  | "noodle" | "riceCake" | "dumpling" | "fishcake" | "pouch" | "water"
  | "jar" | "bottle" | "soju" | "shaker" | "sesame" | "custom";

const INK = "#4A3426";

function Shape({ shape, c }: { shape: IconShape; c: string }) {
  switch (shape) {
    case "meat":
      return (
        <>
          <path d="M9 22c0-8 8-13 17-12 9 1 14 7 13 14-1 8-9 13-18 12C12 35 9 29 9 22Z" fill={c} />
          <path d="M14 21c4-4 10-5 15-3M16 28c5 1 11 0 15-4" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="2.2" />
          <circle cx="31" cy="20" r="2.6" fill="#fff" fillOpacity=".85" />
        </>
      );
    case "drumstick":
      return (
        <>
          <path d="M28 8c7 0 12 5 12 11 0 8-7 11-12 11-6 0-11-4-11-10S21 8 28 8Z" fill={c} />
          <path d="M19 27l-7 7" />
          <circle cx="10" cy="36" r="2.4" fill="#fff" />
          <circle cx="13" cy="39" r="2.4" fill="#fff" />
        </>
      );
    case "fish":
      return (
        <>
          <path d="M6 24c6-8 15-11 24-8 3 1 6 3 8 5l5-5v16l-5-5c-2 2-5 4-8 5-9 3-18 0-24-8Z" fill={c} />
          <circle cx="14" cy="22" r="1.6" fill={INK} stroke="none" />
          <path d="M20 19c2 3 2 7 0 10" fill="none" />
        </>
      );
    case "driedFish":
      return (
        <>
          <path d="M10 8h10l2 30-4 4-4-4-4 4-2-4Z" fill={c} />
          <path d="M26 10h10l-1 28-4 3-4-3Z" fill={c} />
          <path d="M13 16h6M13 22h6M13 28h6M29 17h5M29 24h5M29 31h4" fill="none" />
        </>
      );
    case "clam":
      return (
        <>
          <path d="M8 30c0-11 7-19 16-19s16 8 16 19c-5 4-11 6-16 6s-11-2-16-6Z" fill={c} />
          <path d="M24 12v23M17 14l3 21M31 14l-3 21M11 21l6 13M37 21l-6 13" fill="none" />
          <path d="M19 36h10l-1 3h-8Z" fill={c} />
        </>
      );
    case "shrimp":
      return (
        <>
          <path d="M34 10c-12 0-22 8-22 18 0 6 4 10 10 10 4 0 7-3 7-6h-6c-2 0-3-1-3-3 0-5 7-11 14-11Z" fill={c} />
          <path d="M22 17l3 5M17 22l4 3M15 29h5" fill="none" />
          <path d="M34 10l6-3M34 12l7 1" fill="none" />
          <path d="M22 38l-5 4M24 38l1 5" fill="none" />
        </>
      );
    case "squid":
      return (
        <>
          <path d="M24 5c6 4 9 11 9 19H15c0-8 3-15 9-19Z" fill={c} />
          <path d="M16 24c-1 6-4 10-6 14M20 24c0 6-1 11-3 16M24 24v17M28 24c0 6 1 11 3 16M32 24c1 6 4 10 6 14" fill="none" />
          <circle cx="21" cy="19" r="1.3" fill={INK} stroke="none" />
          <circle cx="27" cy="19" r="1.3" fill={INK} stroke="none" />
        </>
      );
    case "anchovy":
      return (
        <>
          {[12, 22, 32].map((y, i) => (
            <g key={y} transform={`translate(${i % 2 ? 4 : 0} 0)`}>
              <path d={`M8 ${y}c6-4 16-4 24 0l6-4v8l-6-4c-8 4-18 4-24 0Z`} fill={c} />
              <circle cx="12" cy={y - 0.5} r="1" fill={INK} stroke="none" />
            </g>
          ))}
        </>
      );
    case "egg":
      return (
        <>
          <path d="M24 6c8 0 14 13 14 21 0 8-6 14-14 14s-14-6-14-14C10 19 16 6 24 6Z" fill={c} />
          <path d="M17 18c1-3 3-6 5-7" fill="none" stroke="#fff" strokeWidth="2.4" />
        </>
      );
    case "tofu":
      return (
        <>
          <path d="M8 18l14-7 18 6-14 7Z" fill="#fff" />
          <path d="M8 18v14l18 7V24Z" fill={c} />
          <path d="M26 24l14-7v14l-14 8Z" fill={c} />
          <path d="M13 26v4M19 28v5" fill="none" strokeOpacity=".35" />
        </>
      );
    case "onion":
      return (
        <>
          <path d="M24 10c3 4 13 8 13 19 0 7-6 12-13 12s-13-5-13-12c0-11 10-15 13-19Z" fill={c} />
          <path d="M24 10v-4M22 6h4" fill="none" />
          <path d="M24 13c-4 5-6 11-6 17s3 10 6 11M24 13c4 5 6 11 6 17s-3 10-6 11" fill="none" />
          <path d="M20 41l-2 3M24 41v3M28 41l2 3" fill="none" />
        </>
      );
    case "scallion":
      return (
        <>
          <path d="M18 42c-1-12 0-22 3-34l4 1c-2 11-2 21-1 33Z" fill={c} />
          <path d="M23 42c1-10 4-19 9-28l3 2c-4 9-6 17-7 26Z" fill={c} />
          <path d="M16 34h14v8H16Z" fill="#F7F3E8" />
          <path d="M18 42l-2 3M23 42v3M28 42l2 3" fill="none" />
        </>
      );
    case "garlic":
      return (
        <>
          <path d="M24 8c2 4 12 8 12 18 0 8-5 14-12 14s-12-6-12-14c0-10 10-14 12-18Z" fill={c} />
          <path d="M24 9V5" fill="none" />
          <path d="M24 12c-3 6-4 14-2 27M24 12c3 6 4 14 2 27M18 18c-2 6-2 13 0 19M30 18c2 6 2 13 0 19" fill="none" strokeOpacity=".7" />
        </>
      );
    case "minced":
      return (
        <>
          <path d="M8 24h32c0 9-7 15-16 15S8 33 8 24Z" fill="#F4EEE4" />
          <ellipse cx="24" cy="24" rx="16" ry="4" fill={c} />
          {[[17, 23], [22, 25], [27, 22], [31, 25], [20, 21], [26, 26]].map(([x, y]) => (
            <rect key={`${x}${y}`} x={x} y={y} width="2.4" height="2.4" fill="#fff" stroke="none" />
          ))}
        </>
      );
    case "ginger":
      return (
        <path d="M8 30c0-5 4-7 8-6 0-5 4-8 8-6 2-4 8-5 11-1 4-1 7 3 5 7 3 2 2 8-3 8H14c-4 0-6-1-6-2Z" fill={c} />
      );
    case "chili":
      return (
        <>
          <path d="M33 12c3 2 4 6 2 10-5 10-14 16-25 18 7-5 13-13 16-22 1-4 4-8 7-6Z" fill={c} />
          <path d="M33 12c1-3 3-5 6-6M31 11c2-1 4 0 5 2" fill="none" />
        </>
      );
    case "radish":
      return (
        <>
          <path d="M16 18h16c2 0 3 2 3 4l-3 14c-2 6-5 8-8 8s-6-2-8-8l-3-14c0-2 1-4 3-4Z" fill={c} />
          <path d="M16 18h16v6H16Z" fill="#B7CF8E" fillOpacity=".7" />
          <path d="M20 18c-2-5-6-8-9-9 4 0 8 3 11 7M24 18c0-6 1-10 4-13M28 18c2-4 5-7 9-8" fill="none" />
        </>
      );
    case "potato":
      return (
        <>
          <path d="M10 25c0-9 8-15 16-14 8 1 13 7 12 14-1 8-8 13-16 12-7 0-12-5-12-12Z" fill={c} />
          {[[18, 21], [28, 19], [23, 29], [31, 28]].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="1" fill={INK} stroke="none" />
          ))}
        </>
      );
    case "carrot":
      return (
        <>
          <path d="M30 14c3 3 3 6 1 9L14 40c-2 2-5 0-4-2l14-23c2-3 4-3 6-1Z" fill={c} />
          <path d="M30 14c1-4 3-7 7-8M31 16c3-2 6-2 9-1M29 13c0-3-1-6-3-8" fill="none" />
          <path d="M19 28l3 2M15 34l3 2M23 21l3 2" fill="none" />
        </>
      );
    case "zucchini":
      return (
        <>
          <path d="M12 34c-3-3-3-7 0-10l14-14c4-4 10-4 12 0 2 3 1 7-2 10L22 34c-3 3-7 3-10 0Z" fill={c} />
          <path d="M36 10l4-4" fill="none" />
          <path d="M16 28l14-14" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
        </>
      );
    case "eggplant":
      return (
        <>
          <path d="M30 14c5 2 7 8 4 14-4 8-12 14-20 12-4-1-5-5-3-9 4-5 9-9 12-14 2-3 4-4 7-3Z" fill={c} />
          <path d="M26 15c2-2 5-3 8-1-1 2-1 4-3 5M30 14c1-3 3-5 6-7" fill="#8DA66A" />
        </>
      );
    case "mushroom":
      return (
        <>
          <path d="M8 24c0-9 7-15 16-15s16 6 16 15Z" fill={c} />
          <path d="M19 24h10l1 14c0 2-2 4-6 4s-6-2-6-4Z" fill="#F7F0E2" />
          <circle cx="18" cy="17" r="2" fill="#fff" fillOpacity=".8" stroke="none" />
          <circle cx="29" cy="15" r="1.6" fill="#fff" fillOpacity=".8" stroke="none" />
        </>
      );
    case "sprout":
      return (
        <>
          {[14, 22, 30].map((x, i) => (
            <g key={x}>
              <path d={`M${x + 2} 42c-1-8 0-16 ${i - 1} -24`} fill="none" />
              <ellipse cx={x + 1 + i - 1} cy="14" rx="4" ry="3" fill={c} transform={`rotate(${(i - 1) * 15} ${x + i} 14)`} />
            </g>
          ))}
        </>
      );
    case "leaf":
      return (
        <>
          <path d="M14 40C8 30 12 12 34 8c4 16-4 30-20 32Z" fill={c} />
          <path d="M14 40c5-10 11-19 18-28M20 30l-4-6M24 25l-2-8M27 21l5 1M22 33l7-1" fill="none" />
        </>
      );
    case "fern":
      return (
        <>
          <path d="M16 42c0-12 2-22 10-28 4-3 10-3 10 2 0 4-5 5-7 3" fill="none" strokeWidth="3.2" stroke={c} />
          <path d="M16 42c0-12 2-22 10-28 4-3 10-3 10 2 0 4-5 5-7 3" fill="none" />
          <path d="M26 42c0-9 2-17 7-22" fill="none" strokeWidth="3.2" stroke={c} />
          <path d="M26 42c0-9 2-17 7-22" fill="none" />
        </>
      );
    case "root":
      return (
        <>
          <path d="M20 8h8c1 6 1 14-1 22-1 5-2 9-3 12-1-3-3-7-4-12-2-8-1-16 0-22Z" fill={c} />
          <path d="M22 14h4M21 20h6M22 26h4" fill="none" strokeOpacity=".6" />
          <path d="M21 32l-5 6M27 30l5 5" fill="none" />
        </>
      );
    case "cabbage":
      return (
        <>
          <path d="M14 42c-4-8-4-20 2-28 3-4 6-6 8-6s5 2 8 6c6 8 6 20 2 28Z" fill={c} />
          <path d="M24 8v34M24 18l-6-4M24 25l-8-5M24 32l-8-4M24 18l6-4M24 25l8-5M24 32l8-4" fill="none" />
        </>
      );
    case "kimchi":
      return (
        <>
          <path d="M8 26h32c0 8-7 14-16 14S8 34 8 26Z" fill="#F4EEE4" />
          <path d="M11 26c2-8 8-12 14-12s11 4 13 12Z" fill={c} />
          <path d="M18 18c2 3 3 6 2 8M27 16c1 3 1 7-1 10M33 20l-2 6" fill="none" />
        </>
      );
    case "seaweed":
      return (
        <>
          <path d="M14 42c-4-8 4-12 0-20s4-12 2-18" fill="none" strokeWidth="5" stroke={c} />
          <path d="M26 42c-3-7 4-11 1-18s3-11 1-16" fill="none" strokeWidth="5" stroke={c} />
          <path d="M36 42c-2-6 3-9 1-14s2-8 1-12" fill="none" strokeWidth="4" stroke={c} />
          <path d="M8 42h34" fill="none" />
        </>
      );
    case "kelp":
      return (
        <>
          <path d="M10 12c6-2 10 2 14 0s9-2 14 0v24c-5-2-10-2-14 0s-8-2-14 0Z" fill={c} />
          <circle cx="18" cy="20" r="1" fill="#fff" stroke="none" />
          <circle cx="30" cy="26" r="1" fill="#fff" stroke="none" />
          <circle cx="22" cy="30" r="1" fill="#fff" stroke="none" />
        </>
      );
    case "fruit":
      return (
        <>
          <path d="M24 14c-6-4-14 0-14 10 0 9 6 17 14 17s14-8 14-17c0-10-8-14-14-10Z" fill={c} />
          <path d="M24 14c0-4 1-6 3-8" fill="none" />
          <path d="M26 10c3-3 7-3 9-1-3 3-6 3-9 1Z" fill="#9DB572" />
        </>
      );
    case "nut":
      return (
        <>
          <path d="M14 22c0-6 4-10 10-10s10 4 10 10c0 8-5 16-10 16s-10-8-10-16Z" fill={c} />
          <path d="M18 18c2-2 4-3 6-3" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
        </>
      );
    case "noodle":
      return (
        <>
          <path d="M8 26h32c0 8-7 14-16 14S8 34 8 26Z" fill="#F4EEE4" />
          <path d="M12 26c2-6 4-10 6-6s4 6 6 0 4-6 6 0 4 4 6 6" fill="none" strokeWidth="2.6" stroke={c} />
          <path d="M12 26c2-6 4-10 6-6s4 6 6 0 4-6 6 0 4 4 6 6" fill="none" />
          <path d="M31 8l-6 18M36 9l-8 17" fill="none" />
        </>
      );
    case "riceCake":
      return (
        <>
          <ellipse cx="17" cy="20" rx="8" ry="5" fill={c} transform="rotate(-20 17 20)" />
          <ellipse cx="31" cy="22" rx="8" ry="5" fill={c} transform="rotate(15 31 22)" />
          <ellipse cx="23" cy="32" rx="8" ry="5" fill={c} transform="rotate(-5 23 32)" />
        </>
      );
    case "dumpling":
      return (
        <>
          <path d="M6 30c0-9 8-15 18-15s18 6 18 15c-6 3-12 4-18 4S12 33 6 30Z" fill={c} />
          <path d="M14 19l2 4M20 16l1 5M27 16l-1 5M34 19l-2 4" fill="none" />
        </>
      );
    case "fishcake":
      return (
        <>
          <rect x="8" y="12" width="32" height="22" rx="3" fill={c} />
          <path d="M8 18c6 2 10-2 16 0s10 2 16 0" fill="none" strokeOpacity=".5" />
          <path d="M12 38h24" fill="none" />
        </>
      );
    case "pouch":
      return (
        <>
          <path d="M14 12h20l3 28c0 2-1 3-3 3H14c-2 0-3-1-3-3Z" fill={c} />
          <path d="M14 12l2-5h16l2 5" fill="#fff" />
          <rect x="17" y="22" width="14" height="10" rx="2" fill="#fff" fillOpacity=".7" />
        </>
      );
    case "water":
      return (
        <>
          <path d="M12 14h24l-3 26c0 2-2 3-4 3H19c-2 0-4-1-4-3Z" fill="#fff" />
          <path d="M13.5 24h21l-1.8 16c0 1.5-1.5 2-3 2H18.3c-1.5 0-3-.5-3-2Z" fill={c} />
        </>
      );
    case "jar":
      return (
        <>
          <path d="M14 14h20v4c3 2 5 5 5 9v10c0 3-2 5-5 5H14c-3 0-5-2-5-5V27c0-4 2-7 5-9Z" fill={c} />
          <rect x="13" y="8" width="22" height="7" rx="2" fill="#E6D3B3" />
          <rect x="16" y="26" width="16" height="9" rx="2" fill="#fff" fillOpacity=".75" />
        </>
      );
    case "bottle":
      return (
        <>
          <path d="M20 6h8v8c4 2 6 6 6 10v16c0 2-1 3-3 3H17c-2 0-3-1-3-3V24c0-4 2-8 6-10Z" fill={c} />
          <rect x="19" y="4" width="10" height="4" rx="1" fill="#C8A47A" />
          <rect x="17" y="26" width="14" height="9" rx="1.5" fill="#fff" fillOpacity=".75" />
        </>
      );
    case "soju":
      return (
        <>
          <path d="M21 4h6v10c3 2 5 5 5 9v18c0 2-1 3-3 3H19c-2 0-3-1-3-3V23c0-4 2-7 5-9Z" fill={c} />
          <path d="M16 28h16v8H16Z" fill="#fff" fillOpacity=".8" />
          <path d="M19 10c0 6-1 10-1 14" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
        </>
      );
    case "shaker":
      return (
        <>
          <path d="M15 16h18l2 24c0 2-1 3-3 3H16c-2 0-3-1-3-3Z" fill={c} />
          <path d="M15 16c0-5 4-9 9-9s9 4 9 9Z" fill="#D8C3A3" />
          <circle cx="21" cy="11" r=".9" fill={INK} stroke="none" />
          <circle cx="24" cy="10" r=".9" fill={INK} stroke="none" />
          <circle cx="27" cy="11" r=".9" fill={INK} stroke="none" />
        </>
      );
    case "sesame":
      return (
        <>
          <path d="M8 26h32c0 8-7 14-16 14S8 34 8 26Z" fill="#F4EEE4" />
          {[[14, 22], [19, 19], [24, 22], [29, 19], [34, 22], [17, 25], [27, 25], [22, 17], [31, 24]].map(([x, y]) => (
            <ellipse key={`${x}${y}`} cx={x} cy={y} rx="2" ry="1.2" fill={c} transform={`rotate(${(x * 7) % 60 - 30} ${x} ${y})`} />
          ))}
        </>
      );
    case "custom":
    default:
      return (
        <>
          <path d="M8 26h32c0 8-7 14-16 14S8 34 8 26Z" fill={c} />
          <path d="M18 20c0-4 3-6 6-6s6 2 6 6" fill="none" strokeDasharray="2 3" />
        </>
      );
  }
}

export function IngredientIcon({
  shape,
  color,
  size = 48,
  className,
}: {
  shape: IconShape;
  color: string;
  size?: number;
  className?: string;
}) {
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
      <Shape shape={shape} c={color} />
    </svg>
  );
}
