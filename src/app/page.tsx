import Link from "next/link";
import { RecipeImage } from "@/components/RecipeImage";
import { isEditor } from "@/lib/auth";
import { listRecipes } from "@/lib/store";
import { CATEGORIES, hasContent, type Recipe } from "@/lib/types";

export const dynamic = "force-dynamic";

function RecipeCard({ recipe, editor }: { recipe: Recipe; editor: boolean }) {
  const ready = hasContent(recipe);
  return (
    <li className="group relative">
      <Link href={`/recipes/${recipe.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-card">
          <RecipeImage
            src={recipe.image}
            name={recipe.name}
            category={recipe.category}
            sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
          />
        </div>
        <div className="mt-2.5 px-0.5">
          <h3 className="font-serif text-[1.2rem] font-bold leading-snug text-ink group-hover:text-clay">
            {recipe.name}
          </h3>
          <p className="mt-0.5 text-[15px] text-ink-faint">
            {ready
              ? `재료 ${recipe.ingredients.length}가지 · ${recipe.cookSteps.length}단계`
              : "아직 적지 않았어요"}
          </p>
        </div>
      </Link>
      {editor && (
        <Link
          href={`/recipes/${recipe.id}/edit`}
          className="absolute right-2 top-2 rounded-full bg-card/95 px-3 py-1 text-sm font-semibold text-clay shadow-sm hover:bg-clay hover:text-white"
        >
          {ready ? "수정" : "작성"}
        </Link>
      )}
    </li>
  );
}

export default async function Home() {
  const [recipes, editor] = await Promise.all([listRecipes(), isEditor()]);
  const sections = CATEGORIES.map((c) => ({ ...c, items: recipes.filter((r) => r.category === c.id) }));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <section className="pt-10 pb-6 sm:pt-14">
        <p className="text-[15px] font-medium text-clay">우리 집 레시피 {recipes.length}가지</p>
        <h1 className="mt-2 font-serif text-[2rem] leading-tight font-bold sm:text-[2.6rem]">
          엄마가 해주던 그 맛,
          <br />
          잊어버리지 않게 적어둡니다.
        </h1>
      </section>

      <nav className="sticky top-[61px] z-20 -mx-4 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
        <ul className="flex gap-2 overflow-x-auto">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line-strong bg-card px-4 py-1.5 text-base font-semibold hover:border-clay hover:text-clay"
              >
                {s.label}
                <span className="text-sm font-normal text-ink-faint">{s.items.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((s, i) => (
        <section key={s.id} id={s.id} className="scroll-mt-32 pt-12">
          <header className="mb-6 flex items-end justify-between gap-4 border-b border-line-strong pb-3">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-sm text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="font-serif text-[1.9rem] font-bold">{s.label}</h2>
              <p className="hidden text-ink-soft sm:block">{s.blurb}</p>
            </div>
            <span className="text-ink-faint">{s.items.length}가지</span>
          </header>
          {s.items.length ? (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-4">
              {s.items.map((r) => (
                <RecipeCard key={r.id} recipe={r} editor={editor} />
              ))}
            </ul>
          ) : (
            <p className="py-8 text-ink-faint">아직 등록된 레시피가 없어요.</p>
          )}
        </section>
      ))}
    </div>
  );
}
