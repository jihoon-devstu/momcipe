"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/cleaning", label: "청소" },
  { href: "/laundry", label: "빨래" },
  { href: "/chores", label: "집안일" },
  { href: "/cooking", label: "요리" },
];

/** 상단 메뉴. 지금 보고 있는 갈래에 밑줄 (가이드 상세는 data-section 으로 알려줌) */
export function MainNav({ section }: { section?: string }) {
  const path = usePathname();
  const current = path.startsWith("/recipes")
    ? "/cooking"
    : (LINKS.find((l) => path.startsWith(l.href))?.href ?? (section ? `/${section}` : undefined));
  return (
    <ul className="flex gap-1 overflow-x-auto">
      {LINKS.map((l) => {
        const on = current === l.href;
        return (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`block whitespace-nowrap border-b-2 px-3 py-1.5 text-[17px] font-semibold transition-colors ${
                on ? "border-clay text-clay" : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
