import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

// 엄마가 찍은 사진 저장소. BLOB_READ_WRITE_TOKEN 이 있으면 Vercel Blob,
// 없으면 로컬 개발용으로 public/uploads 에 저장한다.

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // Vercel 함수 요청 한도(4.5MB) 안쪽
const LOCAL_PREFIX = "/uploads/";

export function isUploadedPhoto(src?: string) {
  if (!src) return false;
  if (src.startsWith(LOCAL_PREFIX)) return true;
  try {
    return new URL(src).hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export async function savePhoto(recipeId: string, file: File): Promise<string> {
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const name = `${recipeId.replace(/[^a-z0-9-]/gi, "")}-${Date.now().toString(36)}.${ext}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`recipes/${name}`, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    return blob.url;
  }

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return LOCAL_PREFIX + name;
}

/** 바뀌기 전 사진을 지운다. 기본 제공 사진(/images/...)은 건드리지 않는다. */
export async function deletePhoto(src?: string) {
  if (!src || !isUploadedPhoto(src)) return;
  try {
    if (src.startsWith(LOCAL_PREFIX)) {
      await fs.unlink(path.join(process.cwd(), "public", src));
    } else if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { del } = await import("@vercel/blob");
      await del(src);
    }
  } catch {
    // 이미 지워졌으면 그만
  }
}
