import { NextResponse } from "next/server";
import { isEditor } from "@/lib/auth";
import { MAX_UPLOAD_BYTES, savePhoto } from "@/lib/photos";

const TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
  if (!(await isEditor())) {
    return NextResponse.json({ error: "로그인이 풀렸어요. 다시 로그인해 주세요." }, { status: 401 });
  }
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const recipeId = String(form?.get("recipeId") ?? "new");
  if (!(file instanceof File)) return NextResponse.json({ error: "사진을 골라주세요." }, { status: 400 });
  if (!TYPES.includes(file.type)) {
    return NextResponse.json({ error: "JPG, PNG 사진만 올릴 수 있어요." }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "사진이 너무 커요. 다른 사진으로 해주세요." }, { status: 413 });
  }
  try {
    return NextResponse.json({ url: await savePhoto(recipeId, file) });
  } catch (e) {
    console.error("photo upload failed", e);
    return NextResponse.json({ error: "사진을 올리지 못했어요. 잠시 뒤 다시 해주세요." }, { status: 500 });
  }
}
