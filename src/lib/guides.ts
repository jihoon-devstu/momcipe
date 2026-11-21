import type { GuideIconName } from "@/components/GuideIcon";

// 청소 · 빨래 · 기타 집안일 가이드. 요리는 따로 Recipe 로 관리한다.

export type Section = "cleaning" | "laundry" | "chores";

export const SECTIONS: {
  id: Section;
  label: string;
  blurb: string;
  icon: GuideIconName;
  groups: string[];
  scheduled: boolean;
}[] = [
  { id: "cleaning", label: "청소", blurb: "청소기, 걸레질, 화장실까지", icon: "vacuum", groups: ["집 청소", "화장실"], scheduled: true },
  { id: "laundry", label: "빨래", blurb: "옷마다 다른 세탁기 설정과 말리는 법", icon: "washer", groups: ["수건·속옷", "옷", "이불·침구"], scheduled: false },
  { id: "chores", label: "기타 집안일", blurb: "화초, 분리수거, 냉장고 정리", icon: "plant", groups: ["집안일"], scheduled: true },
];

export function sectionOf(id: Section) {
  return SECTIONS.find((s) => s.id === id)!;
}

export type ScheduleUnit = "day" | "week" | "month";
export interface Schedule {
  every: number;
  unit: ScheduleUnit;
}

export interface Supply {
  name: string;
  amount?: string;
}

export interface WasherSetting {
  course?: string;
  temp?: string;
  rinse?: string;
  spin?: string;
  net?: boolean;
}

export interface Guide {
  id: string;
  section: Section;
  group: string;
  title: string;
  icon: GuideIconName;
  image?: string;
  intro?: string;
  /** 준비물 (청소) / 넣는 것 (빨래) */
  supplies: Supply[];
  steps: string[];
  tips?: string;
  /** 빨래 전용 */
  washer?: WasherSetting;
  drying?: { methods: string[]; note?: string };
  /** 청소·기타 집안일 전용 */
  schedule?: Schedule;
  /** 한 날 기록, 최신이 앞 */
  doneLog: number[];
  order: number;
  createdAt: number;
  updatedAt: number;
}

export type GuideInput = Pick<
  Guide,
  "section" | "group" | "title" | "icon" | "image" | "intro" | "supplies" | "steps" | "tips" | "washer" | "drying" | "schedule"
>;

export function hasGuideContent(g: Guide) {
  return g.steps.length > 0 || g.supplies.length > 0 || Boolean(g.washer?.course);
}

/* ---------- 고를 수 있는 값들 ---------- */

export const SUPPLY_SUGGESTIONS: Record<Section, string[]> = {
  cleaning: [
    "청소기", "밀대", "물걸레 패드", "극세사 걸레", "고무장갑", "수세미", "솔",
    "락스", "욕실 세정제", "베이킹소다", "구연산", "과탄산소다", "주방세제", "변기 세정제", "곰팡이 제거제", "분무기",
  ],
  laundry: [
    "액체 세제", "가루 세제", "울샴푸", "섬유유연제", "과탄산소다", "산소계 표백제", "식초", "베이킹소다", "세탁망", "건조기 시트",
  ],
  chores: ["물뿌리개", "화분 영양제", "분무기", "종량제 봉투", "음식물 봉투", "재활용 봉투", "행주", "고무장갑", "새 필터"],
};

export const WASHER_COURSES = ["표준", "울·섬세", "수건", "이불", "강력", "쾌속", "삶음", "기능성(아웃도어)", "속옷", "손빨래"];
export const WASHER_TEMPS = ["찬물", "30℃", "40℃", "60℃", "90℃"];
export const WASHER_RINSES = ["1회", "2회", "3회", "4회"];
export const WASHER_SPINS = ["탈수 안 함", "약", "중", "강"];
export const DRYING_METHODS = ["건조기", "실내 건조", "햇볕 건조", "그늘 건조", "뉘어서 건조", "옷걸이에 걸어서", "건조기 금지"];

export const UNIT_LABEL: Record<ScheduleUnit, string> = { day: "일", week: "주", month: "달" };

export function scheduleLabel(s: Schedule) {
  if (s.unit === "day" && s.every === 1) return "매일";
  if (s.every === 1) return s.unit === "week" ? "매주" : "매달";
  return `${s.every}${UNIT_LABEL[s.unit]}에 한 번`;
}

/* ---------- 주기 계산 (한국 시간 기준 날짜) ---------- */

const DAY = 24 * 60 * 60 * 1000;
const KST = 9 * 60 * 60 * 1000;

export function dayIndex(ts: number) {
  return Math.floor((ts + KST) / DAY);
}

export function intervalDays(s: Schedule) {
  return s.every * (s.unit === "day" ? 1 : s.unit === "week" ? 7 : 30);
}

/** 다음에 할 날까지 남은 날 수. 음수면 밀린 날 수, null 이면 아직 한 번도 안 함 */
export function daysUntilDue(g: Guide, now = Date.now()): number | null {
  if (!g.schedule) return null;
  const last = g.doneLog[0];
  if (!last) return null;
  return dayIndex(last) + intervalDays(g.schedule) - dayIndex(now);
}

export function dueText(g: Guide, now = Date.now()) {
  if (!g.schedule) return "";
  const d = daysUntilDue(g, now);
  if (d === null) return "아직 기록 없음";
  if (d < 0) return `${-d}일 밀렸어요`;
  if (d === 0) return "오늘 할 차례";
  if (d === 1) return "내일";
  return `${d}일 뒤`;
}

export function lastDoneText(g: Guide, now = Date.now()) {
  const last = g.doneLog[0];
  if (!last) return "기록 없음";
  const ago = dayIndex(now) - dayIndex(last);
  if (ago === 0) return "오늘";
  if (ago === 1) return "어제";
  return `${ago}일 전`;
}

export function formatDate(ts: number) {
  return new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", month: "long", day: "numeric", weekday: "short" }).format(ts);
}

/* ---------- 처음 채워 넣는 목록 (내용은 직접 적는다) ---------- */

type Seed = [Section, string, string, string, GuideIconName, Schedule?];
const SEED: Seed[] = [
  ["cleaning", "vacuum", "집 청소", "청소기 돌리기", "vacuum", { every: 3, unit: "day" }],
  ["cleaning", "mopping", "집 청소", "바닥 걸레질", "mop", { every: 1, unit: "week" }],
  ["cleaning", "dusting", "집 청소", "먼지 닦기 (가구·창틀)", "duster", { every: 2, unit: "week" }],
  ["cleaning", "kitchen-sink", "집 청소", "싱크대·가스레인지 청소", "sink", { every: 1, unit: "week" }],
  ["cleaning", "bathroom", "화장실", "화장실 전체 청소", "toilet", { every: 1, unit: "week" }],
  ["cleaning", "toilet-bowl", "화장실", "변기 청소", "toilet", { every: 3, unit: "day" }],
  ["cleaning", "drain", "화장실", "배수구 머리카락 청소", "drain", { every: 2, unit: "week" }],
  ["cleaning", "mold", "화장실", "실리콘 곰팡이 제거", "spray", { every: 1, unit: "month" }],
  ["laundry", "towel", "수건·속옷", "수건 빨래", "towel"],
  ["laundry", "underwear", "수건·속옷", "속옷·양말", "socks"],
  ["laundry", "white", "옷", "흰 옷", "shirt"],
  ["laundry", "color", "옷", "색깔 옷", "shirt"],
  ["laundry", "jeans", "옷", "청바지", "jeans"],
  ["laundry", "knit", "옷", "니트·울 스웨터", "sweater"],
  ["laundry", "sportswear", "옷", "운동복·기능성 옷", "shirt"],
  ["laundry", "padding", "옷", "패딩", "padding"],
  ["laundry", "bedding", "이불·침구", "이불·베개커버", "bedding"],
  ["chores", "plants", "집안일", "화초 물 주기", "plant", { every: 1, unit: "week" }],
  ["chores", "recycling", "집안일", "분리수거", "recycle", { every: 1, unit: "week" }],
  ["chores", "food-waste", "집안일", "음식물 쓰레기 버리기", "trash", { every: 2, unit: "day" }],
  ["chores", "fridge", "집안일", "냉장고 정리", "fridge", { every: 1, unit: "month" }],
  ["chores", "sheets", "집안일", "침대 시트 갈기", "bedding", { every: 2, unit: "week" }],
  ["chores", "aircon-filter", "집안일", "에어컨·공기청정기 필터 청소", "fan", { every: 1, unit: "month" }],
];

export function seedGuides(): Guide[] {
  const now = Date.now();
  return SEED.map(([section, id, group, title, icon, schedule], i) => ({
    id,
    section,
    group,
    title,
    icon,
    supplies: [],
    steps: [],
    doneLog: [],
    ...(schedule ? { schedule } : {}),
    order: i,
    createdAt: now,
    updatedAt: now,
  }));
}
