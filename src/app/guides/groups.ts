import type { Guide, Section } from "@/lib/guides";

/** 편집기에서 고를 수 있게, 갈래마다 지금까지 쓴 묶음 이름 */
export function groupsBySection(guides: Guide[]): Record<Section, string[]> {
  const out: Record<Section, string[]> = { cleaning: [], laundry: [], chores: [] };
  for (const g of guides) if (!out[g.section].includes(g.group)) out[g.section].push(g.group);
  return out;
}
