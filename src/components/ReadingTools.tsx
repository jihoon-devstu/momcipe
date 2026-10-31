"use client";

import { useEffect, useRef, useState } from "react";

const SIZES = [
  { label: "보통", scale: 1 },
  { label: "크게", scale: 1.15 },
  { label: "아주 크게", scale: 1.3 },
];

/** 글씨 크기 조절 + 요리하는 동안 화면이 꺼지지 않게 */
export function ReadingTools({ targetId }: { targetId: string }) {
  const [size, setSize] = useState(0);
  const [awake, setAwake] = useState(false);
  const lock = useRef<WakeLockSentinel | null>(null);
  const canWake = typeof navigator !== "undefined" && "wakeLock" in navigator;

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("momcipe:size"));
      if (saved >= 0 && saved < SIZES.length) setSize(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.getElementById(targetId)?.style.setProperty("--read-scale", String(SIZES[size].scale));
    try {
      localStorage.setItem("momcipe:size", String(size));
    } catch {}
  }, [size, targetId]);

  useEffect(() => {
    // 다른 앱 갔다 오면 wake lock 이 풀리므로 다시 잡는다
    const onVisible = async () => {
      if (awake && document.visibilityState === "visible" && !lock.current) {
        lock.current = await navigator.wakeLock.request("screen").catch(() => null);
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [awake]);

  async function toggleAwake() {
    if (awake) {
      await lock.current?.release();
      lock.current = null;
      setAwake(false);
    } else {
      lock.current = await navigator.wakeLock.request("screen").catch(() => null);
      setAwake(Boolean(lock.current));
      lock.current?.addEventListener("release", () => (lock.current = null));
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-[15px]">
      <div className="flex overflow-hidden rounded-full border border-line-strong bg-card" role="group" aria-label="글씨 크기">
        {SIZES.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setSize(i)}
            aria-pressed={size === i}
            className={`cursor-pointer px-3.5 py-1.5 ${size === i ? "bg-ink text-white" : "text-ink-soft hover:bg-clay-soft"}`}
          >
            {s.label}
          </button>
        ))}
      </div>
      {canWake && (
        <button
          onClick={toggleAwake}
          aria-pressed={awake}
          className={`cursor-pointer rounded-full border px-3.5 py-1.5 ${
            awake ? "border-sage bg-sage text-white" : "border-line-strong bg-card text-ink-soft hover:bg-clay-soft"
          }`}
        >
          {awake ? "화면 켜둠 ✓" : "화면 계속 켜두기"}
        </button>
      )}
    </div>
  );
}
