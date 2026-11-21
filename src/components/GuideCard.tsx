import Image from "next/image";
import Link from "next/link";
import { GuideIcon } from "@/components/GuideIcon";
import { daysUntilDue, dueText, hasGuideContent, scheduleLabel, type Guide } from "@/lib/guides";

export function dueTone(g: Guide) {
  const d = daysUntilDue(g);
  if (!g.schedule) return "";
  if (d === null) return "bg-butter text-ink";
  if (d < 0) return "bg-clay text-white";
  if (d === 0) return "bg-clay-soft text-clay-dark";
  return "bg-sage-soft text-sage";
}

/** 갈래 페이지의 한 줄 카드 */
export function GuideCard({ guide, editor }: { guide: Guide; editor: boolean }) {
  const ready = hasGuideContent(guide);
  const washer = guide.washer;
  return (
    <li className="group relative">
      <Link
        href={`/guides/${guide.id}`}
        className="flex items-center gap-4 rounded-xl border border-line bg-card p-3.5 transition-colors hover:border-line-strong hover:bg-white"
      >
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-paper">
          {guide.image ? (
            <Image src={guide.image} alt="" fill sizes="64px" className="object-cover" />
          ) : (
            <GuideIcon name={guide.icon} size={44} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[1.2rem] leading-snug font-bold group-hover:text-clay">{guide.title}</h3>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-ink-faint">
            {guide.schedule && (
              <>
                <span>{scheduleLabel(guide.schedule)}</span>
                <span className={`rounded-full px-2 py-0.5 text-[13px] font-semibold ${dueTone(guide)}`}>{dueText(guide)}</span>
              </>
            )}
            {washer?.course && (
              <span>
                {[washer.course, washer.temp, washer.spin && `탈수 ${washer.spin}`].filter(Boolean).join(" · ")}
              </span>
            )}
            {!ready && <span>아직 적지 않았어요</span>}
            {ready && !guide.schedule && !washer?.course && <span>순서 {guide.steps.length}단계</span>}
          </p>
        </div>
      </Link>
      {editor && (
        <Link
          href={`/guides/${guide.id}/edit`}
          className="absolute top-2.5 right-2.5 rounded-full bg-paper px-3 py-1 text-sm font-semibold text-clay hover:bg-clay hover:text-white"
        >
          {ready ? "수정" : "작성"}
        </Link>
      )}
    </li>
  );
}
