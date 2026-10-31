import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChangePhoto } from "@/components/ChangePhoto";
import { IngredientIcon } from "@/components/IngredientIcon";
import { ReadingTools } from "@/components/ReadingTools";
import { RecipeImage } from "@/components/RecipeImage";
import { isEditor } from "@/lib/auth";
import { IMAGES } from "@/lib/images";
import { findIngredient, isSeasoning } from "@/lib/ingredients";
import { getRecipe } from "@/lib/store";
import { CATEGORIES, hasContent, type IngredientEntry } from "@/lib/types";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = await getRecipe((await params).id);
  return { title: recipe?.name ?? "레시피" };
}

function IngredientRow({ item }: { item: IngredientEntry }) {
  const def = findIngredient(item.key);
  const detail = [item.option, item.cut].filter(Boolean).join(" · ");
  return (
    <li className="flex items-center gap-3 border-b border-dashed border-line py-3 last:border-0">
      <IngredientIcon shape={def?.icon ?? "custom"} color={def?.color ?? "#efe3cf"} size={40} className="shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="font-semibold">{item.name}</span>
        {detail && <span className="ml-2 text-[0.85em] text-ink-soft">{detail}</span>}
        {item.note && <p className="text-[0.8em] text-ink-faint">{item.note}</p>}
      </div>
      <span className="shrink-0 text-right font-semibold whitespace-nowrap text-clay-dark">
        {item.amount} {item.unit}
      </span>
    </li>
  );
}

function SectionTitle({ n, title, sub }: { n: number; title: string; sub?: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3 border-b-2 border-ink pb-2">
      <span className="font-serif text-[0.9em] text-clay">{n}</span>
      <h2 className="font-serif text-[1.55em] font-bold">{title}</h2>
      {sub && <span className="text-[0.8em] text-ink-faint">{sub}</span>}
    </div>
  );
}

function Steps({ steps, big }: { steps: string[]; big?: boolean }) {
  return (
    <ol className="space-y-5">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-4">
          <span
            className={`flex shrink-0 items-center justify-center rounded-full font-serif font-bold ${
              big ? "h-[2.1em] w-[2.1em] bg-ink text-white" : "h-[1.8em] w-[1.8em] border-2 border-ink-soft text-ink-soft"
            }`}
          >
            {i + 1}
          </span>
          <p className={`whitespace-pre-line pt-[0.15em] ${big ? "text-[1.12em] leading-[1.7]" : ""}`}>{s}</p>
        </li>
      ))}
    </ol>
  );
}

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const [recipe, editor] = await Promise.all([getRecipe(id), isEditor()]);
  if (!recipe) notFound();

  const category = CATEGORIES.find((c) => c.id === recipe.category)!;
  const credit = Object.values(IMAGES).find((i) => i.src === recipe.image);
  const main = recipe.ingredients.filter((i) => !isSeasoning(i.key));
  const sauce = recipe.ingredients.filter((i) => isSeasoning(i.key));
  const hasPrep = recipe.sauceSteps.length > 0 || recipe.prepSteps.length > 0;

  return (
    <article className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
      <nav className="flex items-center justify-between gap-3 py-5 text-[15px]">
        <Link href={`/#${category.id}`} className="text-ink-soft hover:text-clay">
          ← {category.label} 목록
        </Link>
        {editor && (
          <Link href={`/recipes/${recipe.id}/edit`} className="btn-ghost px-4 py-1.5 text-[15px]">
            수정하기
          </Link>
        )}
      </nav>

      <header>
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-card">
          <RecipeImage src={recipe.image} name={recipe.name} category={recipe.category} sizes="(min-width: 768px) 720px, 100vw" priority />
          {editor && (
            <div className="absolute right-3 bottom-3">
              <ChangePhoto recipeId={recipe.id} hasPhoto={Boolean(recipe.image)} />
            </div>
          )}
        </div>
        {credit && (
          <p className="mt-1.5 text-right text-xs text-ink-faint">
            사진: {credit.author} ·{" "}
            <a href={credit.licenseUrl || credit.source} className="underline" target="_blank" rel="noreferrer">
              {credit.license}
            </a>
          </p>
        )}
        <p className="mt-6 text-clay">{category.label}</p>
        <h1 className="mt-1 font-serif text-[2.2rem] leading-tight font-bold sm:text-[2.7rem]">{recipe.name}</h1>
        {(recipe.intro || recipe.servings) && (
          <p className="mt-3 text-lg text-ink-soft">
            {recipe.servings && <span className="mr-3 rounded bg-butter px-2 py-0.5 text-base text-ink">{recipe.servings}</span>}
            {recipe.intro}
          </p>
        )}
      </header>

      {!hasContent(recipe) ? (
        <div className="mt-12 rounded-2xl border border-dashed border-line-strong bg-card px-6 py-14 text-center">
          <p className="font-serif text-2xl">아직 레시피를 적지 않았어요.</p>
          <p className="mt-2 text-ink-soft">엄마가 곧 채워주실 거예요.</p>
          {editor && (
            <Link href={`/recipes/${recipe.id}/edit`} className="btn-primary mt-6">
              지금 적기
            </Link>
          )}
        </div>
      ) : (
        <div id="reading" className="mt-8 text-[calc(19px*var(--read-scale,1))] leading-relaxed">
          <div className="mb-10 border-y border-line py-3">
            <ReadingTools targetId="reading" />
          </div>

          <section className="mb-14">
            <SectionTitle n={1} title="요리 재료" sub={`${recipe.ingredients.length}가지`} />
            <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
              {main.length > 0 && (
                <div>
                  <h3 className="mb-1 text-[0.85em] font-semibold tracking-wide text-ink-faint">재료</h3>
                  <ul>{main.map((i, n) => <IngredientRow key={n} item={i} />)}</ul>
                </div>
              )}
              {sauce.length > 0 && (
                <div>
                  <h3 className="mb-1 text-[0.85em] font-semibold tracking-wide text-ink-faint">양념</h3>
                  <ul>{sauce.map((i, n) => <IngredientRow key={n} item={i} />)}</ul>
                </div>
              )}
            </div>
          </section>

          {hasPrep && (
            <section className="mb-14">
              <SectionTitle n={2} title="밑재료 준비" />
              <div className="space-y-8">
                {recipe.sauceSteps.length > 0 && (
                  <div className="rounded-xl bg-clay-soft/60 p-5 sm:p-6">
                    <h3 className="mb-4 font-serif text-[1.15em] font-bold text-clay-dark">양념 만들기</h3>
                    <Steps steps={recipe.sauceSteps} />
                  </div>
                )}
                {recipe.prepSteps.length > 0 && (
                  <div className="rounded-xl bg-sage-soft/70 p-5 sm:p-6">
                    <h3 className="mb-4 font-serif text-[1.15em] font-bold text-sage">재료 손질</h3>
                    <Steps steps={recipe.prepSteps} />
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="mb-14">
            <SectionTitle n={hasPrep ? 3 : 2} title="레시피" sub="만드는 순서" />
            <Steps steps={recipe.cookSteps} big />
          </section>

          {recipe.tips && (
            <aside className="rounded-xl border-l-4 border-butter bg-card p-5 sm:p-6">
              <h3 className="mb-2 font-serif text-[1.1em] font-bold">엄마의 한마디</h3>
              <p className="whitespace-pre-line text-ink-soft">{recipe.tips}</p>
            </aside>
          )}
        </div>
      )}
    </article>
  );
}
