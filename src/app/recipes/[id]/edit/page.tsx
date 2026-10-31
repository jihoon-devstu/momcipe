import { notFound, redirect } from "next/navigation";
import { RecipeEditor } from "@/components/RecipeEditor";
import { isEditor } from "@/lib/auth";
import { IMAGES } from "@/lib/images";
import { getRecipe } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await isEditor())) redirect(`/login?next=/recipes/${id}/edit`);
  const recipe = await getRecipe(id);
  if (!recipe) notFound();
  return <RecipeEditor recipe={recipe} images={Object.values(IMAGES).map((i) => i.src)} />;
}
