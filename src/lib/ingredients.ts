import type { IconShape } from "@/components/IngredientIcon";

export interface IngredientDef {
  key: string;
  name: string;
  icon: IconShape;
  /** 아이콘 채움 색 */
  color: string;
  /** 처음 골랐을 때 기본 단위 */
  unit: string;
  /** 부위·종류 선택지 (돼지고기 → 삼겹살, 목살 …) */
  options?: { label: string; values: string[] };
  /** 손질 방법을 고를 수 있는 재료인지 */
  cuttable?: boolean;
}

export interface IngredientGroup {
  id: string;
  label: string;
  /** 양념으로 분류되는 그룹인지 (상세 페이지에서 '양념'으로 묶어 보여줌) */
  seasoning: boolean;
  items: IngredientDef[];
}

export const UNITS = [
  "큰술", "작은술", "컵", "g", "kg", "ml", "L",
  "개", "알", "쪽", "대", "줄기", "포기", "모", "마리", "토막",
  "장", "단", "줌", "꼬집", "봉지", "팩", "약간", "적당량",
];

export const CUTS = [
  "통째로", "채썰기", "다지기", "송송썰기", "어슷썰기", "깍둑썰기",
  "반달썰기", "나박썰기", "편썰기", "한입크기", "큼직하게", "찢기",
];

// 색은 아이콘 채움색. 너무 쨍하지 않게 한 톤씩 눌러둠.
export const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    id: "meat",
    label: "고기·생선",
    seasoning: false,
    items: [
      {
        key: "pork", name: "돼지고기", icon: "meat", color: "#EBB5A6", unit: "g", cuttable: true,
        options: { label: "부위", values: ["삼겹살", "목살", "앞다리살", "뒷다리살", "항정살", "갈비", "등갈비", "등뼈", "사태", "다짐육", "수육용 통고기"] },
      },
      {
        key: "beef", name: "소고기", icon: "meat", color: "#C9776A", unit: "g", cuttable: true,
        options: { label: "부위", values: ["양지", "사태", "국거리", "불고기용", "찜갈비", "홍두깨살", "우둔살", "차돌박이", "등심", "다짐육"] },
      },
      {
        key: "chicken", name: "닭고기", icon: "drumstick", color: "#F0CFA0", unit: "g",
        options: { label: "부위", values: ["볶음탕용", "통닭", "닭다리", "닭날개", "가슴살", "안심"] },
      },
      {
        key: "fish", name: "생선", icon: "fish", color: "#A9BFC9", unit: "마리", cuttable: true,
        options: { label: "종류", values: ["고등어", "갈치", "코다리", "동태", "조기", "삼치", "꽁치", "가자미"] },
      },
      { key: "bugeo", name: "북어채", icon: "driedFish", color: "#E2CFA8", unit: "g" },
      {
        key: "shellfish", name: "조개", icon: "clam", color: "#D9C6B0", unit: "g",
        options: { label: "종류", values: ["바지락", "모시조개", "홍합", "꼬막", "굴", "가리비"] },
      },
      { key: "shrimp", name: "새우", icon: "shrimp", color: "#F2A98A", unit: "마리" },
      { key: "squid", name: "오징어", icon: "squid", color: "#F3D9C4", unit: "마리", cuttable: true },
      { key: "anchovy", name: "멸치", icon: "anchovy", color: "#C8CDD0", unit: "g", options: { label: "종류", values: ["볶음용 잔멸치", "중멸치", "국물용 멸치"] } },
      { key: "egg", name: "계란", icon: "egg", color: "#FBEBD0", unit: "개" },
      { key: "tofu", name: "두부", icon: "tofu", color: "#F7F1E3", unit: "모", cuttable: true },
      { key: "soft-tofu", name: "순두부", icon: "tofu", color: "#FBF7EC", unit: "봉지" },
    ],
  },
  {
    id: "aromatics",
    label: "밑재료 (파·마늘·양파)",
    seasoning: false,
    items: [
      { key: "onion", name: "양파", icon: "onion", color: "#E9C893", unit: "개", cuttable: true },
      { key: "green-onion", name: "대파", icon: "scallion", color: "#A7C08A", unit: "대", cuttable: true },
      { key: "chive-onion", name: "쪽파", icon: "scallion", color: "#BCD39A", unit: "줄기", cuttable: true },
      { key: "garlic", name: "마늘", icon: "garlic", color: "#F4EEE1", unit: "쪽", cuttable: true },
      { key: "minced-garlic", name: "다진마늘", icon: "minced", color: "#F1E6C8", unit: "큰술" },
      { key: "ginger", name: "생강", icon: "ginger", color: "#E3C28E", unit: "g", cuttable: true },
      { key: "cheongyang", name: "청양고추", icon: "chili", color: "#7FA05A", unit: "개", cuttable: true },
      { key: "green-chili", name: "풋고추", icon: "chili", color: "#A8C47A", unit: "개", cuttable: true },
      { key: "red-chili", name: "홍고추", icon: "chili", color: "#D9634A", unit: "개", cuttable: true },
      { key: "buchu", name: "부추", icon: "scallion", color: "#8DB06E", unit: "줌", cuttable: true },
    ],
  },
  {
    id: "vegetables",
    label: "채소·나물",
    seasoning: false,
    items: [
      { key: "radish", name: "무", icon: "radish", color: "#F3F0E4", unit: "g", cuttable: true },
      { key: "potato", name: "감자", icon: "potato", color: "#DDBB86", unit: "개", cuttable: true },
      { key: "carrot", name: "당근", icon: "carrot", color: "#EE9A5A", unit: "개", cuttable: true },
      { key: "zucchini", name: "애호박", icon: "zucchini", color: "#B9CF8A", unit: "개", cuttable: true },
      { key: "eggplant", name: "가지", icon: "eggplant", color: "#8E6E9E", unit: "개", cuttable: true },
      {
        key: "mushroom", name: "버섯", icon: "mushroom", color: "#D8BFA0", unit: "g", cuttable: true,
        options: { label: "종류", values: ["표고버섯", "느타리버섯", "팽이버섯", "새송이버섯", "목이버섯"] },
      },
      { key: "bean-sprout", name: "콩나물", icon: "sprout", color: "#F3E6A9", unit: "g" },
      { key: "mung-sprout", name: "숙주", icon: "sprout", color: "#EEF0D2", unit: "g" },
      { key: "spinach", name: "시금치", icon: "leaf", color: "#7FA369", unit: "단" },
      { key: "gosari", name: "고사리", icon: "fern", color: "#9C8259", unit: "g" },
      { key: "doraji", name: "도라지", icon: "root", color: "#F2EAD7", unit: "g", cuttable: true },
      { key: "siraegi", name: "시래기", icon: "leaf", color: "#8F9A63", unit: "g", cuttable: true },
      { key: "napa", name: "배추", icon: "cabbage", color: "#D9E4B5", unit: "포기", cuttable: true },
      { key: "cabbage", name: "양배추", icon: "cabbage", color: "#C7DDA5", unit: "g", cuttable: true },
      { key: "perilla-leaf", name: "깻잎", icon: "leaf", color: "#6F9A5B", unit: "장", cuttable: true },
      { key: "kimchi", name: "김치", icon: "kimchi", color: "#E0795A", unit: "g", cuttable: true },
      { key: "seaweed", name: "미역", icon: "seaweed", color: "#5F7A55", unit: "g" },
      { key: "seaweed-stem", name: "미역줄기", icon: "seaweed", color: "#6E8B5C", unit: "g" },
      { key: "kelp", name: "다시마", icon: "kelp", color: "#58684A", unit: "장" },
      { key: "pear", name: "배", icon: "fruit", color: "#EAD9A2", unit: "개", cuttable: true },
      { key: "apple", name: "사과", icon: "fruit", color: "#E08A72", unit: "개", cuttable: true },
      { key: "jujube", name: "대추", icon: "nut", color: "#B5533F", unit: "개" },
      { key: "chestnut", name: "밤", icon: "nut", color: "#A7774E", unit: "개" },
      { key: "ginkgo", name: "은행", icon: "nut", color: "#E7D38A", unit: "알" },
    ],
  },
  {
    id: "staples",
    label: "면·떡·가공품",
    seasoning: false,
    items: [
      { key: "dangmyeon", name: "당면", icon: "noodle", color: "#E8E0D2", unit: "g" },
      { key: "somyeon", name: "소면", icon: "noodle", color: "#F4EBD6", unit: "g" },
      { key: "rice-cake", name: "떡국떡", icon: "riceCake", color: "#F7F2E8", unit: "g" },
      { key: "dumpling", name: "만두", icon: "dumpling", color: "#F3E7D0", unit: "개" },
      { key: "eomuk", name: "오뎅(어묵)", icon: "fishcake", color: "#E5C08E", unit: "장", cuttable: true },
      { key: "jinmichae", name: "진미채", icon: "driedFish", color: "#F0D8B8", unit: "g" },
      { key: "flour", name: "밀가루", icon: "pouch", color: "#F6F1E7", unit: "컵" },
      { key: "starch", name: "전분가루", icon: "pouch", color: "#EFEFEA", unit: "큰술" },
      { key: "rice-water", name: "쌀뜨물", icon: "water", color: "#EEEADF", unit: "컵" },
      { key: "water", name: "물", icon: "water", color: "#CFE2E8", unit: "컵" },
      { key: "broth", name: "멸치육수", icon: "water", color: "#E6D2AA", unit: "컵" },
    ],
  },
  {
    id: "sauces",
    label: "장·양념",
    seasoning: true,
    items: [
      { key: "gochujang", name: "고추장", icon: "jar", color: "#B8432F", unit: "큰술" },
      { key: "doenjang", name: "된장", icon: "jar", color: "#9A6A3A", unit: "큰술" },
      { key: "ssamjang", name: "쌈장", icon: "jar", color: "#8A4C2E", unit: "큰술" },
      { key: "gochugaru", name: "고춧가루", icon: "pouch", color: "#C9452E", unit: "큰술" },
      { key: "soy-jin", name: "진간장", icon: "bottle", color: "#4A2E22", unit: "큰술" },
      { key: "soy-guk", name: "국간장", icon: "bottle", color: "#6B4A33", unit: "큰술" },
      { key: "soy-yangjo", name: "양조간장", icon: "bottle", color: "#5A3A2A", unit: "큰술" },
      { key: "oyster-sauce", name: "굴소스", icon: "bottle", color: "#3E2E26", unit: "큰술" },
      { key: "sesame-oil", name: "참기름", icon: "bottle", color: "#C98B3A", unit: "큰술" },
      { key: "perilla-oil", name: "들기름", icon: "bottle", color: "#A9893F", unit: "큰술" },
      { key: "cooking-oil", name: "식용유", icon: "bottle", color: "#EBD27A", unit: "큰술" },
      { key: "vinegar", name: "식초", icon: "bottle", color: "#EFE6C6", unit: "큰술" },
      { key: "sesame", name: "깨", icon: "sesame", color: "#EAD8AE", unit: "큰술" },
      { key: "perilla-powder", name: "들깨가루", icon: "pouch", color: "#B49A72", unit: "큰술" },
    ],
  },
  {
    id: "seasonings",
    label: "조미료",
    seasoning: true,
    items: [
      { key: "sugar", name: "설탕", icon: "pouch", color: "#FBFAF6", unit: "큰술" },
      { key: "salt", name: "소금", icon: "shaker", color: "#F5F5F2", unit: "작은술" },
      { key: "mat-salt", name: "맛소금", icon: "shaker", color: "#EAF0F2", unit: "작은술" },
      { key: "pepper", name: "후추", icon: "shaker", color: "#5B544D", unit: "약간" },
      { key: "msg", name: "미원", icon: "pouch", color: "#F2E2A5", unit: "꼬집" },
      { key: "dasida", name: "다시다", icon: "pouch", color: "#D96C4A", unit: "작은술" },
      { key: "corn-syrup", name: "물엿", icon: "bottle", color: "#F4E3B5", unit: "큰술" },
      { key: "oligo", name: "올리고당", icon: "bottle", color: "#F0D99A", unit: "큰술" },
      { key: "honey", name: "꿀", icon: "jar", color: "#E8B54A", unit: "큰술" },
      { key: "maesil", name: "매실액", icon: "bottle", color: "#B58A3A", unit: "큰술" },
    ],
  },
  {
    id: "jeotgal",
    label: "액젓·젓갈",
    seasoning: true,
    items: [
      { key: "tuna-sauce", name: "참치액젓", icon: "bottle", color: "#7A4B2C", unit: "큰술" },
      { key: "anchovy-sauce", name: "멸치액젓", icon: "bottle", color: "#8C5B32", unit: "큰술" },
      { key: "sand-lance-sauce", name: "까나리액젓", icon: "bottle", color: "#9A6838", unit: "큰술" },
      { key: "saeujeot", name: "새우젓", icon: "jar", color: "#F1D3C0", unit: "작은술" },
    ],
  },
  {
    id: "alcohol",
    label: "술",
    seasoning: true,
    items: [
      { key: "mirin", name: "맛술", icon: "bottle", color: "#E9D3A0", unit: "큰술" },
      { key: "soju", name: "소주", icon: "soju", color: "#9CC9A4", unit: "큰술" },
      { key: "cheongju", name: "청주", icon: "soju", color: "#E8E4D2", unit: "큰술" },
    ],
  },
];

const BY_KEY = new Map(INGREDIENT_GROUPS.flatMap((g) => g.items.map((i) => [i.key, { ...i, group: g }] as const)));

export function findIngredient(key: string) {
  return BY_KEY.get(key);
}

export function isSeasoning(key: string) {
  return BY_KEY.get(key)?.group.seasoning ?? false;
}
