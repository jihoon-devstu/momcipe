"use client";

import { useRef, useState } from "react";

// 휴대폰 사진은 5~10MB 라 브라우저에서 긴 변 1600px JPEG 로 줄여서 올린다.
const MAX_EDGE = 1600;

async function shrink(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    if (blob) return blob;
  } catch {
    // 브라우저가 못 여는 형식이면 원본 그대로 시도
  }
  return file;
}

export async function uploadPhoto(file: File, recipeId: string): Promise<string> {
  const body = new FormData();
  body.append("file", await shrink(file), "photo.jpg");
  body.append("recipeId", recipeId);
  const res = await fetch("/api/photos", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data.error ?? "사진을 올리지 못했어요.");
  return data.url;
}

/** 사진 고르기 버튼. 휴대폰에선 카메라로 바로 찍거나 앨범에서 고를 수 있다. */
export function PhotoButton({
  recipeId,
  onUploaded,
  label = "사진 올리기",
  className = "btn-ghost",
}: {
  recipeId: string;
  onUploaded: (url: string) => void | Promise<void>;
  label?: string;
  className?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      await onUploaded(await uploadPhoto(file, recipeId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "사진을 올리지 못했어요.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <input ref={input} type="file" accept="image/*" className="hidden" onChange={onPick} />
      <button type="button" onClick={() => input.current?.click()} disabled={busy} className={className}>
        {busy ? "올리는 중…" : label}
      </button>
      {error && <span className="text-sm text-clay-dark">{error}</span>}
    </span>
  );
}
