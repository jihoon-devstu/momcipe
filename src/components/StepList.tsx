"use client";

import { useRef, useState } from "react";

/** 순서 적기: 칸마다 번호, 위/아래 이동, 재료·준비물 칩을 누르면 지금 칸에 들어감 */
export function StepList({
  steps,
  onChange,
  placeholder,
  chips,
}: {
  steps: string[];
  onChange: (steps: string[]) => void;
  placeholder: string;
  chips: string[];
}) {
  const refs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const [focused, setFocused] = useState(0);
  const list = steps.length ? steps : [""];

  const set = (i: number, v: string) => onChange(list.map((s, j) => (j === i ? v : s)));
  const move = (i: number, d: -1 | 1) => {
    const next = [...list];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const add = () => {
    onChange([...list, ""]);
    setTimeout(() => refs.current[list.length]?.focus(), 0);
  };
  const insert = (text: string) => {
    const el = refs.current[focused];
    const cur = list[focused] ?? "";
    const pos = el?.selectionStart ?? cur.length;
    const glue = pos > 0 && !/\s$/.test(cur.slice(0, pos)) ? " " : "";
    set(focused, cur.slice(0, pos) + glue + text + cur.slice(pos));
    setTimeout(() => el?.focus(), 0);
  };

  return (
    <div>
      {chips.length > 0 && (
        <div className="mb-4 rounded-xl bg-butter/50 p-3">
          <p className="mb-2 text-sm text-ink-soft">재료를 누르면 지금 쓰는 칸에 들어가요</p>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => insert(c)}
                className="cursor-pointer rounded-full border border-line-strong bg-white px-3 py-1 text-[15px] hover:border-clay"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      <ol className="space-y-3">
        {list.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-lg font-bold text-white">
              {i + 1}
            </span>
            <textarea
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={s}
              onFocus={() => setFocused(i)}
              onChange={(e) => set(i, e.target.value)}
              rows={Math.max(2, Math.ceil(s.length / 32))}
              placeholder={i === 0 ? placeholder : "다음엔 어떻게 하나요?"}
              className="field min-h-20 flex-1 resize-y text-xl leading-relaxed"
            />
            <div className="flex flex-col gap-1 pt-1">
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="cursor-pointer rounded px-2 py-1 text-ink-faint hover:bg-clay-soft disabled:invisible" aria-label="위로">
                ▲
              </button>
              <button type="button" disabled={i === list.length - 1} onClick={() => move(i, 1)} className="cursor-pointer rounded px-2 py-1 text-ink-faint hover:bg-clay-soft disabled:invisible" aria-label="아래로">
                ▼
              </button>
              <button type="button" onClick={() => onChange(list.filter((_, j) => j !== i))} className="cursor-pointer rounded px-2 py-1 text-ink-faint hover:bg-clay-soft hover:text-clay-dark" aria-label="삭제">
                ✕
              </button>
            </div>
          </li>
        ))}
      </ol>
      <button type="button" onClick={add} className="btn-ghost mt-4 ml-12">
        + 순서 추가
      </button>
    </div>
  );
}
