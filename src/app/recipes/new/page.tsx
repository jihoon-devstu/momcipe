import { redirect } from "next/navigation";
import { RecipeEditor } from "@/components/RecipeEditor";
import { isEditor } from "@/lib/auth";
import { IMAGES } from "@/lib/images";

export const metadata = { title: "새 레시피" };

export default async function NewRecipePage() {
  if (!(await isEditor())) redirect("/login?next=/recipes/new");
  return <RecipeEditor recipe={null} images={Object.values(IMAGES).map((i) => i.src)} />;
}
