"use client";

import { useTransition } from "react";
import { markDoneAction, undoDoneAction } from "@/app/guide-actions";

/** '오늘 했어요' — 오늘 이미 눌렀으면 되돌리기만 보여준다 */
export function DoneButton({ id, doneToday, big }: { id: string; doneToday: boolean; big?: boolean }) {
  const [pending, start] = useTransition();
  if (doneToday) {
    return (
      <span className={`inline-flex items-center gap-2 ${big ? "text-lg" : "text-[15px]"}`}>
        <span className="font-semibold text-sage">✓ 오늘 했어요</span>
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => undoDoneAction(id))}
          className="cursor-pointer text-sm text-ink-faint underline underline-offset-4 hover:text-clay-dark"
        >
          취소
        </button>
      </span>
    );
  }
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => markDoneAction(id))}
      className={`btn-primary shrink-0 ${big ? "px-7 py-3 text-lg" : "px-4 py-2 text-[15px]"}`}
    >
      {pending ? "기록 중…" : "오늘 했어요"}
    </button>
  );
}
