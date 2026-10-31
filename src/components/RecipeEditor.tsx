"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { deleteRecipeAction, saveRecipeAction } from "@/app/actions";
import { IngredientIcon } from "@/components/IngredientIcon";
import { PhotoButton } from "@/components/PhotoUpload";
import { CUTS, INGREDIENT_GROUPS, UNITS, findIngredient, type IngredientDef } from "@/lib/ingredients";
import { CATEGORIES, type Category, type IngredientEntry, type Recipe } from "@/lib/types";

const STEPS = [
  { id: "basic", label: "기본 정보" },
  { id: "ingredients", label: "재료 고르기" },
  { id: "sauce", label: "양념 준비" },
  { id: "prep", label: "밑재료 준비" },
  { id: "cook", label: "요리 순서" },
] as const;
type StepId = (typeof STEPS)[number]["id"];

/* ---------- 재료 고르기 ---------- */

function OptionPicker({
  def,
  onPick,
  onClose,
}: {
  def: IngredientDef;
  onPick: (option?: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center" onClick={onClose}>
      <div
        role="dialog"
        aria-label={`${def.name} ${def.options!.label} 고르기`}
        className="w-full max-w-lg rounded-t-2xl bg-card p-6 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <IngredientIcon shape={def.icon} color={def.color} size={52} />
          <div>
            <p className="font-serif text-2xl font-bold">{def.name}</p>
            <p className="text-ink-soft">어떤 {def.options!.label}를 쓰나요?</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {def.options!.values.map((v) => (
            <button
              key={v}
              onClick={() => onPick(v)}
              className="cursor-pointer rounded-full border border-line-strong bg-white px-4 py-2.5 text-lg hover:border-clay hover:bg-clay-soft"
            >
              {v}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-between">
          <button onClick={() => onPick(undefined)} className="btn px-0 text-ink-soft underline underline-offset-4">
            {def.options!.label} 상관없음
          </button>
          <button onClick={onClose} className="btn-ghost">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function IngredientPalette({
  selected,
  onAdd,
}: {
  selected: IngredientEntry[];
  onAdd: (def: IngredientDef, option?: string) => void;
}) {
  const [group, setGroup] = useState(INGREDIENT_GROUPS[0].id);
  const [picking, setPicking] = useState<IngredientDef | null>(null);
  const current = INGREDIENT_GROUPS.find((g) => g.id === group)!;
  const count = (key: string) => selected.filter((s) => s.key === key).length;

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {INGREDIENT_GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => setGroup(g.id)}
            className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-base font-semibold ${
              g.id === group ? "bg-ink text-white" : "border border-line-strong bg-card text-ink-soft hover:text-ink"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
        {current.items.map((def) => {
          const n = count(def.key);
          return (
            <li key={def.key}>
              <button
                onClick={() => (def.options ? setPicking(def) : onAdd(def))}
                className={`relative flex w-full cursor-pointer flex-col items-center gap-1 rounded-xl border px-1 pt-2.5 pb-2 transition-colors ${
                  n ? "border-clay bg-clay-soft" : "border-line bg-card hover:border-line-strong hover:bg-white"
                }`}
              >
                <IngredientIcon shape={def.icon} color={def.color} size={44} />
                <span className="text-center text-[15px] leading-tight font-medium">{def.name}</span>
                {def.options && <span className="text-[11px] text-ink-faint">{def.options.label} 선택</span>}
                {n > 0 && (
                  <span className="absolute top-1 right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-clay px-1 text-xs font-bold text-white">
                    {n}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      {picking && (
        <OptionPicker
          def={picking}
          onClose={() => setPicking(null)}
          onPick={(option) => {
            onAdd(picking, option);
            setPicking(null);
          }}
        />
      )}
    </div>
  );
}

function SelectedIngredient({
  item,
  onChange,
  onRemove,
}: {
  item: IngredientEntry;
  onChange: (patch: Partial<IngredientEntry>) => void;
  onRemove: () => void;
}) {
  const def = findIngredient(item.key);
  const units = UNITS.includes(item.unit) || !item.unit ? UNITS : [item.unit, ...UNITS];
  return (
    <li className="rounded-xl border border-line bg-card p-3 sm:p-4">
      <div className="flex items-center gap-3">
        <IngredientIcon shape={def?.icon ?? "custom"} color={def?.color ?? "#efe3cf"} size={44} className="shrink-0" />
        <div className="min-w-0 flex-1">
          {def ? (
            <p className="text-lg font-semibold">{item.name}</p>
          ) : (
            <input
              value={item.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="w-full border-b border-line-strong bg-transparent text-lg font-semibold focus:border-clay focus:outline-none"
              aria-label="재료 이름"
            />
          )}
          {def?.options && (
            <select
              value={item.option ?? ""}
              onChange={(e) => onChange({ option: e.target.value || undefined })}
              className="mt-0.5 rounded border border-line bg-white px-2 py-0.5 text-[15px] text-ink-soft"
              aria-label={def.options.label}
            >
              <option value="">{def.options.label} 상관없음</option>
              {def.options.values.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          )}
        </div>
        <button onClick={onRemove} className="cursor-pointer rounded-full px-2.5 py-1 text-ink-faint hover:bg-clay-soft hover:text-clay-dark" aria-label={`${item.name} 빼기`}>
          ✕
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <input
          value={item.amount}
          onChange={(e) => onChange({ amount: e.target.value })}
          inputMode="decimal"
          placeholder="얼마나"
          className="field w-24 py-2 text-center"
          aria-label="양"
        />
        <select value={item.unit} onChange={(e) => onChange({ unit: e.target.value })} className="field w-28 py-2" aria-label="단위">
          <option value="">단위</option>
          {units.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
        {(def?.cuttable || !def) && (
          <select value={item.cut ?? ""} onChange={(e) => onChange({ cut: e.target.value || undefined })} className="field w-32 py-2" aria-label="손질">
            <option value="">손질 방법</option>
            {CUTS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        )}
        <input
          value={item.note ?? ""}
          onChange={(e) => onChange({ note: e.target.value })}
          placeholder="메모 (예: 반은 고명용)"
          className="field min-w-40 flex-1 py-2 text-base"
          aria-label="메모"
        />
      </div>
    </li>
  );
}

/* ---------- 순서 적기 ---------- */

function StepList({
  steps,
  onChange,
  placeholder,
  chips,
}: {
  steps: string[];
  onChange: (steps: string[]) => void;
  placeholder: string;
  chips: string[];
}) {
  const refs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const [focused, setFocused] = useState(0);
  const list = steps.length ? steps : [""];

  const set = (i: number, v: string) => onChange(list.map((s, j) => (j === i ? v : s)));
  const move = (i: number, d: -1 | 1) => {
    const next = [...list];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const add = () => {
    onChange([...list, ""]);
    setTimeout(() => refs.current[list.length]?.focus(), 0);
  };
  const insert = (text: string) => {
    const el = refs.current[focused];
    const cur = list[focused] ?? "";
    const pos = el?.selectionStart ?? cur.length;
    const glue = pos > 0 && !/\s$/.test(cur.slice(0, pos)) ? " " : "";
    set(focused, cur.slice(0, pos) + glue + text + cur.slice(pos));
    setTimeout(() => el?.focus(), 0);
  };

  return (
    <div>
      {chips.length > 0 && (
        <div className="mb-4 rounded-xl bg-butter/50 p-3">
          <p className="mb-2 text-sm text-ink-soft">재료를 누르면 지금 쓰는 칸에 들어가요</p>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => insert(c)}
                className="cursor-pointer rounded-full border border-line-strong bg-white px-3 py-1 text-[15px] hover:border-clay"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      <ol className="space-y-3">
        {list.map((s, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-lg font-bold text-white">
              {i + 1}
            </span>
            <textarea
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={s}
              onFocus={() => setFocused(i)}
              onChange={(e) => set(i, e.target.value)}
              rows={Math.max(2, Math.ceil(s.length / 32))}
              placeholder={i === 0 ? placeholder : "다음엔 어떻게 하나요?"}
              className="field min-h-20 flex-1 resize-y text-xl leading-relaxed"
            />
            <div className="flex flex-col gap-1 pt-1">
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="cursor-pointer rounded px-2 py-1 text-ink-faint hover:bg-clay-soft disabled:invisible" aria-label="위로">
                ▲
              </button>
              <button type="button" disabled={i === list.length - 1} onClick={() => move(i, 1)} className="cursor-pointer rounded px-2 py-1 text-ink-faint hover:bg-clay-soft disabled:invisible" aria-label="아래로">
                ▼
              </button>
              <button type="button" onClick={() => onChange(list.filter((_, j) => j !== i))} className="cursor-pointer rounded px-2 py-1 text-ink-faint hover:bg-clay-soft hover:text-clay-dark" aria-label="삭제">
                ✕
              </button>
            </div>
          </li>
        ))}
      </ol>
      <button type="button" onClick={add} className="btn-ghost mt-4 ml-12">
        + 순서 추가
      </button>
    </div>
  );
}

/* ---------- 편집기 ---------- */

export function RecipeEditor({ recipe, images }: { recipe: Recipe | null; images: string[] }) {
  const router = useRouter();
  const [step, setStep] = useState<StepId>(recipe ? "ingredients" : "basic");
  const [name, setName] = useState(recipe?.name ?? "");
  const [category, setCategory] = useState<Category>(recipe?.category ?? "guk");
  const [servings, setServings] = useState(recipe?.servings ?? "");
  const [intro, setIntro] = useState(recipe?.intro ?? "");
  const [image, setImage] = useState(recipe?.image);
  const [ingredients, setIngredients] = useState<IngredientEntry[]>(recipe?.ingredients ?? []);
  const [sauceSteps, setSauceSteps] = useState(recipe?.sauceSteps ?? []);
  const [prepSteps, setPrepSteps] = useState(recipe?.prepSteps ?? []);
  const [cookSteps, setCookSteps] = useState(recipe?.cookSteps ?? []);
  const [tips, setTips] = useState(recipe?.tips ?? "");
  const [customName, setCustomName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();

  const idx = STEPS.findIndex((s) => s.id === step);
  const chips = ingredients.map((i) => i.option ?? i.name);
  const uniqueChips = [...new Set(chips)];

  function addIngredient(def: IngredientDef, option?: string) {
    setIngredients((list) => [...list, { key: def.key, name: def.name, amount: "", unit: def.unit, ...(option ? { option } : {}) }]);
  }

  function save(goView: boolean) {
    setError(null);
    start(async () => {
      const res = await saveRecipeAction(recipe?.id ?? null, {
        name, category, servings, intro, image, ingredients, sauceSteps, prepSteps, cookSteps, tips,
      });
      if (res.error) {
        setError(res.error);
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      if (goView) router.push(`/recipes/${res.id}`);
      else if (!recipe) router.replace(`/recipes/${res.id}/edit`);
      router.refresh();
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-40 sm:px-6">
      <div className="flex items-center justify-between gap-3 py-5">
        <Link href={recipe ? `/recipes/${recipe.id}` : "/"} className="text-[15px] text-ink-soft hover:text-clay">
          ← 나가기
        </Link>
        <p className="text-[15px] text-ink-faint">{recipe ? "레시피 고치기" : "새 레시피 적기"}</p>
      </div>
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">{name || "이름 없는 요리"}</h1>

      {/* 단계 표시 */}
      <ol className="sticky top-[61px] z-20 -mx-4 mt-5 flex gap-1 overflow-x-auto border-b border-line bg-paper/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
        {STEPS.map((s, i) => (
          <li key={s.id}>
            <button
              onClick={() => setStep(s.id)}
              className={`flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-base ${
                s.id === step ? "bg-clay font-semibold text-white" : i < idx ? "text-ink" : "text-ink-faint"
              }`}
            >
              <span className={`font-serif text-sm ${s.id === step ? "text-white/80" : ""}`}>{i + 1}</span>
              {s.label}
              {s.id === "ingredients" && ingredients.length > 0 && <span className="text-sm opacity-80">({ingredients.length})</span>}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        {step === "basic" && (
          <div className="space-y-6">
            <label className="block">
              <span className="mb-1.5 block text-lg font-semibold">요리 이름</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 엄마표 미역국" className="field text-xl" />
            </label>
            <div>
              <span className="mb-1.5 block text-lg font-semibold">분류</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`cursor-pointer rounded-full border px-6 py-2.5 text-lg ${
                      c.id === category ? "border-clay bg-clay text-white" : "border-line-strong bg-card hover:border-clay"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-[180px_1fr]">
              <label className="block">
                <span className="mb-1.5 block text-lg font-semibold">몇 인분</span>
                <input value={servings} onChange={(e) => setServings(e.target.value)} placeholder="예: 4인분" className="field" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-lg font-semibold">한 줄 소개</span>
                <input value={intro} onChange={(e) => setIntro(e.target.value)} placeholder="예: 생일날 끓여주던 소고기 미역국" className="field" />
              </label>
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-lg font-semibold">대표 사진</span>
                <PhotoButton
                  recipeId={recipe?.id ?? "new"}
                  label={image && !images.includes(image) ? "다른 사진으로 바꾸기" : "우리 집 사진 올리기"}
                  onUploaded={(url) => setImage(url)}
                />
              </div>
              {image && !images.includes(image) && (
                <div className="relative mb-3 aspect-[16/9] max-w-md overflow-hidden rounded-xl border-2 border-clay">
                  <Image src={image} alt="올린 사진" fill sizes="448px" className="object-cover" />
                  <span className="absolute top-2 left-2 rounded-full bg-clay px-3 py-0.5 text-sm font-semibold text-white">
                    우리 집 사진
                  </span>
                </div>
              )}
              <p className="mb-2 text-[15px] text-ink-faint">
                {image && !images.includes(image) ? "저장하면 이 사진이 대표 사진이 돼요. 아래 기본 사진으로 되돌릴 수도 있어요." : "또는 기본 사진 중에서 고르세요."}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setImage(undefined)}
                  className={`flex h-20 w-28 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 bg-card text-sm text-ink-soft ${!image ? "border-clay" : "border-line"}`}
                >
                  그림으로
                </button>
                {images.map((src) => (
                  <button
                    key={src}
                    onClick={() => setImage(src)}
                    className={`relative h-20 w-28 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 ${image === src ? "border-clay" : "border-transparent"}`}
                  >
                    <Image src={src} alt="" fill sizes="112px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "ingredients" && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <section>
              <h2 className="mb-1 font-serif text-2xl font-bold">어떤 재료가 들어가나요?</h2>
              <p className="mb-4 text-ink-soft">아이콘을 누르면 오른쪽(아래) 목록에 담겨요.</p>
              <IngredientPalette selected={ingredients} onAdd={addIngredient} />
              <form
                className="mt-5 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!customName.trim()) return;
                  setIngredients((l) => [...l, { key: `custom:${customName.trim()}`, name: customName.trim(), amount: "", unit: "" }]);
                  setCustomName("");
                }}
              >
                <input value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="목록에 없는 재료 직접 적기" className="field flex-1 py-2.5" />
                <button className="btn-ghost">추가</button>
              </form>
            </section>
            <section>
              <h2 className="mb-4 font-serif text-2xl font-bold">
                담은 재료 <span className="text-clay">{ingredients.length}</span>
              </h2>
              {ingredients.length === 0 ? (
                <p className="rounded-xl border border-dashed border-line-strong px-4 py-10 text-center text-ink-faint">아직 고른 재료가 없어요.</p>
              ) : (
                <ul className="space-y-2.5">
                  {ingredients.map((item, i) => (
                    <SelectedIngredient
                      key={i}
                      item={item}
                      onChange={(patch) => setIngredients((l) => l.map((x, j) => (j === i ? { ...x, ...patch } : x)))}
                      onRemove={() => setIngredients((l) => l.filter((_, j) => j !== i))}
                    />
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}

        {step === "sauce" && (
          <section>
            <h2 className="mb-1 font-serif text-2xl font-bold">양념 준비</h2>
            <p className="mb-5 text-ink-soft">양념장을 미리 섞어두는 방법을 적어주세요. 없으면 비워둬도 돼요.</p>
            <StepList steps={sauceSteps} onChange={setSauceSteps} chips={uniqueChips} placeholder="예: 진간장 3큰술, 설탕 1큰술, 다진마늘 1큰술을 섞어둔다" />
          </section>
        )}

        {step === "prep" && (
          <section>
            <h2 className="mb-1 font-serif text-2xl font-bold">밑재료 준비</h2>
            <p className="mb-5 text-ink-soft">재료 씻고, 불리고, 써는 것처럼 미리 해두는 일을 적어주세요.</p>
            <StepList steps={prepSteps} onChange={setPrepSteps} chips={uniqueChips} placeholder="예: 미역은 찬물에 20분 불려서 먹기 좋게 자른다" />
          </section>
        )}

        {step === "cook" && (
          <section>
            <h2 className="mb-1 font-serif text-2xl font-bold">요리 순서</h2>
            <p className="mb-5 text-ink-soft">불 앞에서 하는 순서대로 적어주세요.</p>
            <StepList steps={cookSteps} onChange={setCookSteps} chips={uniqueChips} placeholder="예: 냄비에 참기름을 두르고 소고기를 볶는다" />
            <label className="mt-10 block">
              <span className="mb-1.5 block font-serif text-xl font-bold">엄마의 한마디 (팁)</span>
              <textarea value={tips} onChange={(e) => setTips(e.target.value)} rows={3} placeholder="예: 국간장으로 간하고 마지막에 소금으로 맞춰야 맛있어" className="field text-lg" />
            </label>
          </section>
        )}
      </div>

      {recipe && step === "basic" && (
        <div className="mt-16 border-t border-line pt-6">
          <button
            onClick={() => {
              if (confirm(`'${recipe.name}' 레시피를 지울까요? 되돌릴 수 없어요.`)) start(() => deleteRecipeAction(recipe.id));
            }}
            className="text-[15px] text-ink-faint underline underline-offset-4 hover:text-clay-dark"
          >
            이 레시피 지우기
          </button>
        </div>
      )}

      {/* 아래 고정 버튼 */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center gap-2 px-4 py-3 sm:px-6">
          <button onClick={() => setStep(STEPS[idx - 1].id)} disabled={idx === 0} className="btn-ghost disabled:invisible">
            이전
          </button>
          <div className="flex-1 text-center text-[15px]">
            {error ? <span className="text-clay-dark">{error}</span> : saved ? <span className="text-sage">저장했어요 ✓</span> : null}
          </div>
          <button onClick={() => save(false)} disabled={pending} className="btn-ghost">
            {pending ? "저장 중…" : "중간 저장"}
          </button>
          {idx < STEPS.length - 1 ? (
            <button onClick={() => setStep(STEPS[idx + 1].id)} className="btn-primary">
              다음
            </button>
          ) : (
            <button onClick={() => save(true)} disabled={pending} className="btn-primary">
              다 적었어요
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
