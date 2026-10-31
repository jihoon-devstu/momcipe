import type { Category, Recipe } from "./types";

// 처음 DB가 비어 있을 때 채워 넣는 기본 레시피 목록. 내용은 엄마가 직접 채운다.
const SEED: [Category, string, string][] = [
  ["guk", "miyeokguk", "미역국"],
  ["guk", "sogogi-muguk", "소고기무국"],
  ["guk", "bugeoguk", "북어국"],
  ["guk", "gamja-guk", "감자국"],
  ["guk", "kongnamul-guk", "콩나물국"],
  ["guk", "siraegi-guk", "시래기국"],
  ["guk", "gyeran-guk", "계란국"],
  ["guk", "tteokguk", "떡국 · 떡만두국"],
  ["guk", "yukgaejang", "육개장"],
  ["guk", "muchae-guk", "무채국"],
  ["jjigae", "doenjang-jjigae", "된장찌개"],
  ["jjigae", "sundubu-jjigae", "순두부찌개"],
  ["jjigae", "kimchi-jjigae", "김치찌개"],
  ["yori", "dakdoritang", "닭도리탕"],
  ["yori", "galbijjim", "갈비찜"],
  ["yori", "duruchigi", "두루치기"],
  ["yori", "jangjorim", "장조림"],
  ["yori", "suyuk", "수육"],
  ["yori", "bulgogi", "불고기"],
  ["yori", "japchae", "잡채"],
  ["yori", "fish-jorim", "생선조림 (코다리 · 갈치 · 고등어)"],
  ["yori", "gamjatang", "감자탕"],
  ["yori", "janchi-guksu", "잔치국수"],
  ["yori", "sujebi", "수제비"],
  ["banchan", "eomuk-bokkeum", "오뎅볶음"],
  ["banchan", "gaji-namul", "가지나물"],
  ["banchan", "hobak-namul", "호박나물"],
  ["banchan", "sukju-namul", "숙주나물"],
  ["banchan", "gamja-jorim", "감자조림"],
  ["banchan", "myeolchi-bokkeum", "멸치볶음"],
  ["banchan", "jinmichae-bokkeum", "진미채볶음"],
  ["banchan", "kongnamul-muchim", "콩나물무침"],
  ["banchan", "sigeumchi-muchim", "시금치무침"],
  ["banchan", "gosari-muchim", "고사리무침"],
  ["banchan", "doraji-muchim", "도라지무침"],
  ["banchan", "miyeok-julgi-bokkeum", "미역줄기볶음"],
  ["banchan", "dubu-jorim", "두부조림"],
];

export function seedRecipes(images: Record<string, string>): Recipe[] {
  const now = Date.now();
  return SEED.map(([category, id, name], i) => ({
    id,
    name,
    category,
    image: images[id],
    ingredients: [],
    sauceSteps: [],
    prepSteps: [],
    cookSteps: [],
    order: i,
    createdAt: now,
    updatedAt: now,
  }));
}
