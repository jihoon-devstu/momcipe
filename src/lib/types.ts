export type Category = "guk" | "jjigae" | "yori" | "banchan";

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "guk", label: "국", blurb: "매일 밥상에 올라가는 따뜻한 국" },
  { id: "jjigae", label: "찌개", blurb: "보글보글 끓여 냄비째 내는 찌개" },
  { id: "yori", label: "요리", blurb: "손님 오는 날, 명절에 하는 요리" },
  { id: "banchan", label: "반찬", blurb: "냉장고에 늘 있던 밑반찬" },
];

/** 레시피에 들어가는 재료 한 줄 */
export interface IngredientEntry {
  /** 재료 사전(ingredients.ts)의 key. 직접 입력한 재료는 "custom:" 으로 시작 */
  key: string;
  name: string;
  amount: string;
  unit: string;
  /** 부위 또는 종류 (돼지고기 → 목살, 생선 → 고등어) */
  option?: string;
  /** 손질 방법 (채썰기, 다지기 …) */
  cut?: string;
  note?: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: Category;
  /** public/ 아래 경로 (예: /images/recipes/miyeokguk.jpg) */
  image?: string;
  intro?: string;
  servings?: string;
  ingredients: IngredientEntry[];
  /** 양념 준비 */
  sauceSteps: string[];
  /** 밑재료 준비 */
  prepSteps: string[];
  /** 요리 순서 */
  cookSteps: string[];
  tips?: string;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export type RecipeInput = Omit<Recipe, "id" | "createdAt" | "updatedAt" | "order">;

export function hasContent(r: Recipe) {
  return r.ingredients.length > 0 || r.cookSteps.length > 0;
}
