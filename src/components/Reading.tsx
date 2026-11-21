// 레시피·집안일 상세 페이지에서 같이 쓰는 큰 글씨 블록

export function SectionTitle({ n, title, sub }: { n: number; title: string; sub?: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3 border-b-2 border-ink pb-2">
      <span className="font-serif text-[0.9em] text-clay">{n}</span>
      <h2 className="font-serif text-[1.55em] font-bold">{title}</h2>
      {sub && <span className="text-[0.8em] text-ink-faint">{sub}</span>}
    </div>
  );
}

export function Steps({ steps, big }: { steps: string[]; big?: boolean }) {
  return (
    <ol className="space-y-5">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-4">
          <span
            className={`flex shrink-0 items-center justify-center rounded-full font-serif font-bold ${
              big ? "h-[2.1em] w-[2.1em] bg-ink text-white" : "h-[1.8em] w-[1.8em] border-2 border-ink-soft text-ink-soft"
            }`}
          >
            {i + 1}
          </span>
          <p className={`whitespace-pre-line pt-[0.15em] ${big ? "text-[1.12em] leading-[1.7]" : ""}`}>{s}</p>
        </li>
      ))}
    </ol>
  );
}

export function MomTip({ text }: { text: string }) {
  return (
    <aside className="rounded-xl border-l-4 border-butter bg-card p-5 sm:p-6">
      <h3 className="mb-2 font-serif text-[1.1em] font-bold">엄마의 한마디</h3>
      <p className="whitespace-pre-line text-ink-soft">{text}</p>
    </aside>
  );
}
