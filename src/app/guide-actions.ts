"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isEditor } from "@/lib/auth";
import { GUIDE_ICONS, type GuideIconName } from "@/components/GuideIcon";
import { SECTIONS, type Guide, type GuideInput, type ScheduleUnit } from "@/lib/guides";
import { deletePhoto, isUploadedPhoto } from "@/lib/photos";
import { deleteGuide, getGuide, listGuides, saveGuide } from "@/lib/store";

async function requireEditor() {
  if (!(await isEditor())) throw new Error("편집 권한이 없어요. 다시 로그인해 주세요.");
}

function refresh(g: Pick<Guide, "id" | "section">) {
  revalidatePath("/");
  revalidatePath(`/${g.section}`);
  revalidatePath(`/guides/${g.id}`);
}

const text = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

function sanitize(input: GuideInput): GuideInput {
  const section = SECTIONS.find((s) => s.id === input.section);
  if (!section) throw new Error("분류를 골라주세요.");
  const title = text(input.title, 60);
  if (!title) throw new Error("제목을 적어주세요.");
  const every = Math.round(Number(input.schedule?.every));
  const unit = input.schedule?.unit as ScheduleUnit;
  return {
    section: section.id,
    group: text(input.group, 20) || section.groups[0],
    title,
    icon: (input.icon in GUIDE_ICONS ? input.icon : "house") as GuideIconName,
    image: input.image?.startsWith("/images/") || isUploadedPhoto(input.image) ? input.image : undefined,
    intro: text(input.intro, 300) || undefined,
    tips: text(input.tips, 2000) || undefined,
    supplies: input.supplies
      .map((s) => ({ name: text(s.name, 30), ...(text(s.amount, 20) ? { amount: text(s.amount, 20) } : {}) }))
      .filter((s) => s.name)
      .slice(0, 40),
    steps: input.steps.map((s) => text(s, 1000)).filter(Boolean).slice(0, 60),
    washer:
      section.id === "laundry" && input.washer
        ? {
            course: text(input.washer.course, 20) || undefined,
            temp: text(input.washer.temp, 10) || undefined,
            rinse: text(input.washer.rinse, 10) || undefined,
            spin: text(input.washer.spin, 10) || undefined,
            net: Boolean(input.washer.net),
          }
        : undefined,
    drying:
      section.id === "laundry" && input.drying
        ? { methods: input.drying.methods.map((m) => text(m, 20)).filter(Boolean).slice(0, 8), note: text(input.drying.note, 300) || undefined }
        : undefined,
    schedule:
      section.scheduled && every >= 1 && every <= 365 && ["day", "week", "month"].includes(unit) ? { every, unit } : undefined,
  };
}

export async function saveGuideAction(id: string | null, input: GuideInput): Promise<{ error?: string; id?: string }> {
  try {
    await requireEditor();
    const data = sanitize(input);
    const now = Date.now();
    let guide: Guide;
    if (id) {
      const prev = await getGuide(id);
      if (!prev) return { error: "항목을 찾을 수 없어요." };
      guide = { ...prev, ...data, updatedAt: now };
      if (prev.image !== guide.image) await deletePhoto(prev.image);
    } else {
      const all = await listGuides();
      guide = {
        ...data,
        id: `${data.section}-${now.toString(36)}`,
        doneLog: [],
        order: Math.max(0, ...all.map((g) => g.order)) + 1,
        createdAt: now,
        updatedAt: now,
      };
    }
    await saveGuide(guide);
    refresh(guide);
    return { id: guide.id };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "저장하지 못했어요." };
  }
}

/** '오늘 했어요' */
export async function markDoneAction(id: string) {
  await requireEditor();
  const g = await getGuide(id);
  if (!g) return;
  await saveGuide({ ...g, doneLog: [Date.now(), ...g.doneLog].slice(0, 30) });
  refresh(g);
}

/** 잘못 누른 '했어요' 되돌리기 */
export async function undoDoneAction(id: string) {
  await requireEditor();
  const g = await getGuide(id);
  if (!g || !g.doneLog.length) return;
  await saveGuide({ ...g, doneLog: g.doneLog.slice(1) });
  refresh(g);
}

export async function setGuideImageAction(id: string, image: string): Promise<{ error?: string }> {
  try {
    await requireEditor();
    if (!isUploadedPhoto(image)) return { error: "올린 사진을 찾을 수 없어요." };
    const prev = await getGuide(id);
    if (!prev) return { error: "항목을 찾을 수 없어요." };
    await saveGuide({ ...prev, image, updatedAt: Date.now() });
    if (prev.image !== image) await deletePhoto(prev.image);
    refresh(prev);
    return {};
  } catch (e) {
    return { error: e instanceof Error ? e.message : "사진을 바꾸지 못했어요." };
  }
}

export async function deleteGuideAction(id: string) {
  await requireEditor();
  const g = await getGuide(id);
  if (g) {
    await deletePhoto(g.image);
    await deleteGuide(id);
    refresh(g);
  }
  redirect(g ? `/${g.section}` : "/");
}
