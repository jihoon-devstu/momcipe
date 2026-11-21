import Link from "next/link";
import { DoneButton } from "@/components/DoneButton";
import { GuideIcon, type GuideIconName } from "@/components/GuideIcon";
import { dueTone } from "@/components/GuideCard";
import { isEditor } from "@/lib/auth";
import { SECTIONS, dayIndex, daysUntilDue, dueText, lastDoneText, sectionOf, type Guide } from "@/lib/guides";
import { listGuides, listRecipes } from "@/lib/store";

export const dynamic = "force-dynamic";

function TodoRow({ g, editor }: { g: Guide; editor: boolean }) {
  const doneToday = Boolean(g.doneLog[0]) && dayIndex(g.doneLog[0]) === dayIndex(Date.now());
  return (
    <li className="flex items-center gap-3 border-b border-dashed border-line py-3 last:border-0">
      <GuideIcon name={g.icon} size={40} className="shrink-0" />
      <Link href={`/guides/${g.id}`} className="min-w-0 flex-1 hover:text-clay">
        <p className="text-lg leading-snug font-semibold">{g.title}</p>
        <p className="text-[15px] text-ink-faint">
          {sectionOf(g.section).label} · 마지막 {lastDoneText(g)}
        </p>
      </Link>
      <span className={`hidden shrink-0 rounded-full px-2.5 py-0.5 text-sm font-semibold sm:inline ${dueTone(g)}`}>{dueText(g)}</span>
      {editor && <DoneButton id={g.id} doneToday={doneToday} />}
    </li>
  );
}

export default async function Home() {
  const [guides, recipes, editor] = await Promise.all([listGuides(), listRecipes(), isEditor()]);

  const scheduled = guides
    .filter((g) => g.schedule)
    .map((g) => ({ g, d: daysUntilDue(g) }))
    .sort((a, b) => (a.d ?? -0.5) - (b.d ?? -0.5));
  const today = scheduled.filter((x) => x.d !== null && x.d <= 0).map((x) => x.g);
  // 한 번도 기록 안 한 일은 '오늘 할 일'을 덮지 않게 따로 접어둔다
  const fresh = scheduled.filter((x) => x.d === null).map((x) => x.g);
  const soon = scheduled.filter((x) => x.d !== null && x.d > 0 && x.d <= 3).map((x) => x.g);
  const doneToday = guides.filter((g) => g.doneLog[0] && dayIndex(g.doneLog[0]) === dayIndex(Date.now()));

  const tiles: { href: string; label: string; blurb: string; icon: GuideIconName; count: number }[] = [
    ...SECTIONS.map((s) => ({
      href: `/${s.id}`,
      label: s.label,
      blurb: s.blurb,
      icon: s.icon,
      count: guides.filter((g) => g.section === s.id).length,
    })),
    { href: "/cooking", label: "요리", blurb: "국, 찌개, 요리, 반찬 레시피", icon: "pot", count: recipes.length },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <section className="pt-10 pb-8 sm:pt-14">
        <p className="text-[15px] font-medium text-clay">엄마가 알려주는 살림</p>
        <h1 className="mt-2 font-serif text-[2rem] leading-tight font-bold sm:text-[2.6rem]">
          청소부터 빨래, 밥까지
          <br />
          엄마한테 배운 대로 해요.
        </h1>
      </section>

      <section className="rounded-2xl border border-line bg-card p-5 sm:p-7">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-[1.6rem] font-bold">
            오늘 할 일 <span className="text-clay">{today.length}</span>
          </h2>
          {doneToday.length > 0 && <p className="text-[15px] text-sage">오늘 {doneToday.length}가지 했어요 ✓</p>}
        </div>
        {today.length === 0 ? (
          <p className="py-6 text-lg text-ink-soft">
            {fresh.length === scheduled.length
              ? "한 번 하고 '오늘 했어요'를 누르면, 주기에 맞춰 여기에 다시 올라와요."
              : "오늘은 밀린 일이 없어요. 잘하고 있어요!"}
          </p>
        ) : (
          <ul>
            {today.map((g) => (
              <TodoRow key={g.id} g={g} editor={editor} />
            ))}
          </ul>
        )}
        {soon.length > 0 && (
          <div className="mt-5 border-t border-line pt-4">
            <h3 className="mb-1 text-[15px] font-semibold text-ink-faint">곧 할 일</h3>
            <ul>
              {soon.map((g) => (
                <TodoRow key={g.id} g={g} editor={editor} />
              ))}
            </ul>
          </div>
        )}
        {fresh.length > 0 && (
          <details className="group mt-5 border-t border-line pt-4" open={fresh.length === scheduled.length}>
            <summary className="cursor-pointer list-none text-[15px] font-semibold text-ink-faint hover:text-ink">
              <span className="inline-block transition-transform group-open:rotate-90">▸</span> 아직 기록이 없는 일 {fresh.length}
            </summary>
            <ul className="mt-1">
              {fresh.map((g) => (
                <TodoRow key={g.id} g={g} editor={editor} />
              ))}
            </ul>
          </details>
        )}
        {!editor && <p className="mt-4 text-sm text-ink-faint">로그인하면 &lsquo;오늘 했어요&rsquo;를 기록할 수 있어요.</p>}
      </section>

      <section className="pt-12">
        <h2 className="mb-5 font-serif text-[1.6rem] font-bold">살림 노트</h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {tiles.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-clay hover:bg-white"
              >
                <GuideIcon name={t.icon} size={56} />
                <span className="mt-3 font-serif text-[1.45rem] font-bold">{t.label}</span>
                <span className="mt-0.5 text-[15px] leading-snug text-ink-soft">{t.blurb}</span>
                <span className="mt-auto pt-3 text-sm text-ink-faint">{t.count}가지</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
