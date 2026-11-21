import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideCard } from "@/components/GuideCard";
import { GuideIcon } from "@/components/GuideIcon";
import { isEditor } from "@/lib/auth";
import { SECTIONS } from "@/lib/guides";
import { listGuides } from "@/lib/store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: id } = await params;
  const s = SECTIONS.find((x) => x.id === id);
  return { title: s?.label ?? "살림" };
}

export default async function SectionPage({ params }: Props) {
  const { section: id } = await params;
  const section = SECTIONS.find((s) => s.id === id);
  if (!section) notFound();
  const [all, editor] = await Promise.all([listGuides(), isEditor()]);
  const items = all.filter((g) => g.section === section.id);
  // 정해둔 묶음 순서대로, 직접 만든 묶음은 뒤에
  const groups = [...new Set([...section.groups, ...items.map((g) => g.group)])]
    .map((name) => ({ name, items: items.filter((g) => g.group === name) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <section className="flex flex-wrap items-end justify-between gap-4 pt-10 pb-4 sm:pt-14">
        <div className="flex items-center gap-4">
          <GuideIcon name={section.icon} size={64} />
          <div>
            <h1 className="font-serif text-[2.1rem] leading-tight font-bold sm:text-[2.5rem]">{section.label}</h1>
            <p className="text-lg text-ink-soft">{section.blurb}</p>
          </div>
        </div>
        {editor && (
          <Link href={`/guides/new?section=${section.id}`} className="btn-primary">
            + 새로 적기
          </Link>
        )}
      </section>

      {groups.length === 0 && <p className="py-10 text-ink-faint">아직 적어둔 게 없어요.</p>}
      {groups.map((group) => (
        <section key={group.name} className="pt-8">
          <header className="mb-4 flex items-baseline justify-between border-b border-line-strong pb-2">
            <h2 className="font-serif text-[1.5rem] font-bold">{group.name}</h2>
            <span className="text-ink-faint">{group.items.length}가지</span>
          </header>
          <ul className="grid gap-3 md:grid-cols-2">
            {group.items.map((g) => (
              <GuideCard key={g.id} guide={g} editor={editor} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
