"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkLogin, endSession, isEditor, loginConfigured, startSession } from "@/lib/auth";
import { deleteRecipe, getRecipe, listRecipes, saveRecipe } from "@/lib/store";
import { CATEGORIES, type Recipe, type RecipeInput } from "@/lib/types";

export async function login(_prev: string | null, form: FormData): Promise<string | null> {
  if (!loginConfigured()) return "아직 로그인 정보가 설정되지 않았어요.";
  const ok = await checkLogin(String(form.get("id") ?? ""), String(form.get("pw") ?? ""));
  if (!ok) {
    // 무차별 대입을 조금이라도 늦추기 위한 지연
    await new Promise((r) => setTimeout(r, 800));
    return "아이디나 비밀번호가 맞지 않아요.";
  }
  await startSession();
  const next = String(form.get("next") ?? "/");
  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/");
}

export async function logout() {
  await endSession();
  redirect("/");
}

async function requireEditor() {
  if (!(await isEditor())) throw new Error("편집 권한이 없어요. 다시 로그인해 주세요.");
}

const clean = (lines: string[]) => lines.map((l) => l.trim()).filter(Boolean);

function sanitize(input: RecipeInput): RecipeInput {
  const name = input.name.trim();
  if (!name) throw new Error("요리 이름을 적어주세요.");
  if (!CATEGORIES.some((c) => c.id === input.category)) throw new Error("분류를 골라주세요.");
  return {
    name: name.slice(0, 60),
    category: input.category,
    image: input.image?.startsWith("/images/") ? input.image : undefined,
    intro: input.intro?.trim().slice(0, 300) || undefined,
    servings: input.servings?.trim().slice(0, 30) || undefined,
    tips: input.tips?.trim().slice(0, 2000) || undefined,
    ingredients: input.ingredients
      .filter((i) => i.name.trim())
      .slice(0, 80)
      .map((i) => ({
        key: String(i.key).slice(0, 60),
        name: i.name.trim().slice(0, 30),
        amount: String(i.amount ?? "").trim().slice(0, 20),
        unit: String(i.unit ?? "").trim().slice(0, 10),
        ...(i.option ? { option: String(i.option).slice(0, 30) } : {}),
        ...(i.cut ? { cut: String(i.cut).slice(0, 20) } : {}),
        ...(i.note?.trim() ? { note: i.note.trim().slice(0, 60) } : {}),
      })),
    sauceSteps: clean(input.sauceSteps).slice(0, 40),
    prepSteps: clean(input.prepSteps).slice(0, 40),
    cookSteps: clean(input.cookSteps).slice(0, 60),
  };
}

function slugify(name: string) {
  const ascii = name.normalize("NFKD").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
  return `${ascii || "recipe"}-${Date.now().toString(36)}`;
}

export async function saveRecipeAction(id: string | null, input: RecipeInput): Promise<{ error?: string; id?: string }> {
  try {
    await requireEditor();
    const data = sanitize(input);
    const now = Date.now();
    let recipe: Recipe;
    if (id) {
      const prev = await getRecipe(id);
      if (!prev) return { error: "레시피를 찾을 수 없어요." };
      recipe = { ...prev, ...data, image: data.image ?? prev.image, updatedAt: now };
    } else {
      const all = await listRecipes();
      recipe = {
        ...data,
        id: slugify(data.name),
        order: Math.max(0, ...all.map((r) => r.order)) + 1,
        createdAt: now,
        updatedAt: now,
      };
    }
    await saveRecipe(recipe);
    revalidatePath("/");
    revalidatePath(`/recipes/${recipe.id}`);
    return { id: recipe.id };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "저장하지 못했어요." };
  }
}

export async function deleteRecipeAction(id: string) {
  await requireEditor();
  await deleteRecipe(id);
  revalidatePath("/");
  redirect("/");
}
