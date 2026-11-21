import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChangePhoto } from "@/components/ChangePhoto";
import { DoneButton } from "@/components/DoneButton";
import { dueTone } from "@/components/GuideCard";
import { GuideIcon } from "@/components/GuideIcon";
import { MomTip, SectionTitle, Steps } from "@/components/Reading";
import { ReadingTools } from "@/components/ReadingTools";
import { RecipeHeroImage } from "@/components/RecipeImage";
import { isEditor } from "@/lib/auth";
import { dayIndex, dueText, formatDate, hasGuideContent, lastDoneText, scheduleLabel, sectionOf, type Guide } from "@/lib/guides";
import { getGuide } from "@/lib/store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = await getGuide((await params).id);
  return { title: g?.title ?? "살림" };
}

function SchedulePanel({ g, editor }: { g: Guide; editor: boolean }) {
  const doneToday = Boolean(g.doneLog[0]) && dayIndex(g.doneLog[0]) === dayIndex(Date.now());
  return (
    <section className="mt-8 rounded-2xl border border-line bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <dl className="grid grid-cols-3 gap-x-6 gap-y-1 text-[15px]">
          <dt className="text-ink-faint">주기</dt>
          <dt className="text-ink-faint">마지막</dt>
          <dt className="text-ink-faint">다음</dt>
          <dd className="text-lg font-semibold">{scheduleLabel(g.schedule!)}</dd>
          <dd className="text-lg font-semibold">{lastDoneText(g)}</dd>
          <dd>
            <span className={`rounded-full px-2.5 py-0.5 text-base font-semibold ${dueTone(g)}`}>{dueText(g)}</span>
          </dd>
        </dl>
        {editor && <DoneButton id={g.id} doneToday={doneToday} big />}
      </div>
      {g.doneLog.length > 0 && (
        <p className="mt-4 border-t border-line pt-3 text-[15px] text-ink-soft">
          <span className="mr-2 text-ink-faint">최근 기록</span>
          {g.doneLog.slice(0, 6).map(formatDate).join(" · ")}
        </p>
      )}
    </section>
  );
}

function SupplyList({ g, title }: { g: Guide; title: string }) {
  return (
    <div>
      <h3 className="mb-2 text-[0.85em] font-semibold tracking-wide text-ink-faint">{title}</h3>
      <ul>
        {g.supplies.map((s, i) => (
          <li key={i} className="flex items-center justify-between gap-3 border-b border-dashed border-line py-2.5 last:border-0">
            <span className="font-semibold">{s.name}</span>
            {s.amount && <span className="font-semibold text-clay-dark">{s.amount}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function WasherPanel({ g }: { g: Guide }) {
  const w = g.washer ?? {};
  const tiles = [
    ["코스", w.course],
    ["물 온도", w.temp],
    ["헹굼", w.rinse],
    ["탈수", w.spin],
  ].filter(([, v]) => v);
  if (!tiles.length && !w.net) return null;
  return (
    <div>
      <h3 className="mb-2 text-[0.85em] font-semibold tracking-wide text-ink-faint">세탁기 설정</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tiles.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-[#e6eef0] px-4 py-3">
            <p className="text-[0.75em] text-ink-soft">{label}</p>
            <p className="text-[1.15em] font-bold">{value}</p>
          </div>
        ))}
      </div>
      {w.net && <p className="mt-2 font-semibold text-sage">✓ 세탁망에 넣어서</p>}
    </div>
  );
}

export default async function GuidePage({ params }: Props) {
  const { id } = await params;
  const [g, editor] = await Promise.all([getGuide(id), isEditor()]);
  if (!g) notFound();
  const section = sectionOf(g.section);
  const laundry = g.section === "laundry";
  let n = 0;

  return (
    <article className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
      <nav className="flex items-center justify-between gap-3 py-5 text-[15px]">
        <Link href={`/${g.section}`} className="text-ink-soft hover:text-clay">
          ← {section.label}
        </Link>
        {editor && (
          <Link href={`/guides/${g.id}/edit`} className="btn-ghost px-4 py-1.5 text-[15px]">
            수정하기
          </Link>
        )}
      </nav>

      {g.image && (
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-line bg-card">
          <RecipeHeroImage src={g.image} name={g.title} category="guk" />
          {editor && (
            <div className="absolute right-3 bottom-3">
              <ChangePhoto recipeId={g.id} hasPhoto kind="guide" />
            </div>
          )}
        </div>
      )}

      <header className="flex items-start gap-4">
        {!g.image && <GuideIcon name={g.icon} size={72} className="shrink-0" />}
        <div className="min-w-0 flex-1">
          <p className="text-clay">
            {section.label} · {g.group}
          </p>
          <h1 className="mt-1 font-serif text-[2.1rem] leading-tight font-bold sm:text-[2.6rem]">{g.title}</h1>
          {g.intro && <p className="mt-2 text-lg text-ink-soft">{g.intro}</p>}
          {editor && !g.image && (
            <div className="mt-3">
              <ChangePhoto recipeId={g.id} hasPhoto={false} kind="guide" />
            </div>
          )}
        </div>
      </header>

      {g.schedule && <SchedulePanel g={g} editor={editor} />}

      {!hasGuideContent(g) ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line-strong bg-card px-6 py-14 text-center">
          <p className="font-serif text-2xl">아직 방법을 적지 않았어요.</p>
          {editor && (
            <Link href={`/guides/${g.id}/edit`} className="btn-primary mt-6">
              지금 적기
            </Link>
          )}
        </div>
      ) : (
        <div id="reading" className="mt-8 text-[calc(19px*var(--read-scale,1))] leading-relaxed">
          <div className="mb-10 border-y border-line py-3">
            <ReadingTools targetId="reading" />
          </div>

          {(g.supplies.length > 0 || (laundry && g.washer?.course)) && (
            <section className="mb-14">
              <SectionTitle n={++n} title={laundry ? "세탁 준비" : "준비물"} />
              <div className="space-y-8">
                {laundry && <WasherPanel g={g} />}
                {g.supplies.length > 0 && <SupplyList g={g} title={laundry ? "넣는 것" : "챙길 것"} />}
              </div>
            </section>
          )}

          {g.steps.length > 0 && (
            <section className="mb-14">
              <SectionTitle n={++n} title={laundry ? "빨래 순서" : "하는 순서"} />
              <Steps steps={g.steps} big />
            </section>
          )}

          {laundry && g.drying && (g.drying.methods.length > 0 || g.drying.note) && (
            <section className="mb-14">
              <SectionTitle n={++n} title="말리는 법" />
              <div className="flex flex-wrap gap-2">
                {g.drying.methods.map((m) => (
                  <span
                    key={m}
                    className={`rounded-full px-4 py-1.5 font-semibold ${m === "건조기 금지" ? "bg-clay text-white" : "bg-sage-soft text-sage"}`}
                  >
                    {m}
                  </span>
                ))}
              </div>
              {g.drying.note && <p className="mt-4 whitespace-pre-line">{g.drying.note}</p>}
            </section>
          )}

          {g.tips && <MomTip text={g.tips} />}
        </div>
      )}
    </article>
  );
}
