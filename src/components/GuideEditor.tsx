"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteGuideAction, saveGuideAction } from "@/app/guide-actions";
import { GUIDE_ICONS, GuideIcon, type GuideIconName } from "@/components/GuideIcon";
import { PhotoButton } from "@/components/PhotoUpload";
import { StepList } from "@/components/StepList";
import {
  DRYING_METHODS, SECTIONS, SUPPLY_SUGGESTIONS, UNIT_LABEL, WASHER_COURSES, WASHER_RINSES, WASHER_SPINS, WASHER_TEMPS,
  sectionOf, type Guide, type Schedule, type ScheduleUnit, type Section, type Supply, type WasherSetting,
} from "@/lib/guides";

const SCHEDULE_PRESETS: { label: string; s: Schedule }[] = [
  { label: "매일", s: { every: 1, unit: "day" } },
  { label: "이틀에 한 번", s: { every: 2, unit: "day" } },
  { label: "3일에 한 번", s: { every: 3, unit: "day" } },
  { label: "매주", s: { every: 1, unit: "week" } },
  { label: "2주에 한 번", s: { every: 2, unit: "week" } },
  { label: "매달", s: { every: 1, unit: "month" } },
  { label: "3달에 한 번", s: { every: 3, unit: "month" } },
];

function Block({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-7">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      {hint && <p className="mt-1 text-ink-soft">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Chips({
  options,
  value,
  onPick,
  multi,
}: {
  options: string[];
  value: string | string[] | undefined;
  onPick: (v: string) => void;
  multi?: boolean;
}) {
  const on = (o: string) => (multi ? (value as string[] | undefined)?.includes(o) : value === o);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onPick(o)}
          aria-pressed={on(o)}
          className={`cursor-pointer rounded-full border px-4 py-2 text-base ${
            on(o) ? "border-clay bg-clay text-white" : "border-line-strong bg-card hover:border-clay"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function GuideEditor({
  guide,
  initialSection,
  groupsBySection,
}: {
  guide: Guide | null;
  initialSection: Section;
  groupsBySection: Record<Section, string[]>;
}) {
  const router = useRouter();
  const [section, setSection] = useState<Section>(guide?.section ?? initialSection);
  const [group, setGroup] = useState(guide?.group ?? sectionOf(initialSection).groups[0]);
  const [customGroup, setCustomGroup] = useState("");
  const [title, setTitle] = useState(guide?.title ?? "");
  const [intro, setIntro] = useState(guide?.intro ?? "");
  const [icon, setIcon] = useState<GuideIconName>(guide?.icon ?? sectionOf(initialSection).icon);
  const [image, setImage] = useState(guide?.image);
  const [schedule, setSchedule] = useState<Schedule | undefined>(guide?.schedule ?? (guide ? undefined : { every: 1, unit: "week" }));
  const [washer, setWasher] = useState<WasherSetting>(guide?.washer ?? {});
  const [drying, setDrying] = useState(guide?.drying ?? { methods: [] as string[], note: "" });
  const [supplies, setSupplies] = useState<Supply[]>(guide?.supplies ?? []);
  const [customSupply, setCustomSupply] = useState("");
  const [steps, setSteps] = useState(guide?.steps ?? []);
  const [tips, setTips] = useState(guide?.tips ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();

  const meta = sectionOf(section);
  const laundry = section === "laundry";
  const groups = [...new Set([...meta.groups, ...groupsBySection[section]])];

  function changeSection(s: Section) {
    setSection(s);
    setGroup(sectionOf(s).groups[0]);
    if (!guide) setIcon(sectionOf(s).icon);
  }

  const toggleSupply = (name: string) =>
    setSupplies((l) => (l.some((s) => s.name === name) ? l.filter((s) => s.name !== name) : [...l, { name }]));

  function save(goView: boolean) {
    setError(null);
    start(async () => {
      const res = await saveGuideAction(guide?.id ?? null, {
        section,
        group: customGroup.trim() || group,
        title,
        icon,
        image,
        intro,
        supplies,
        steps,
        tips,
        washer: laundry ? washer : undefined,
        drying: laundry ? drying : undefined,
        schedule: meta.scheduled ? schedule : undefined,
      });
      if (res.error) {
        setError(res.error);
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      if (goView) router.push(`/guides/${res.id}`);
      else if (!guide) router.replace(`/guides/${res.id}/edit`);
      router.refresh();
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-40 sm:px-6">
      <div className="flex items-center justify-between gap-3 py-5">
        <Link href={guide ? `/guides/${guide.id}` : `/${section}`} className="text-[15px] text-ink-soft hover:text-clay">
          ← 나가기
        </Link>
        <p className="text-[15px] text-ink-faint">{guide ? "고치기" : "새로 적기"}</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-6">
          <div>
            <span className="mb-1.5 block text-lg font-semibold">갈래</span>
            <Chips options={SECTIONS.map((s) => s.label)} value={meta.label} onPick={(l) => changeSection(SECTIONS.find((s) => s.label === l)!.id)} />
          </div>
          <div>
            <span className="mb-1.5 block text-lg font-semibold">묶음</span>
            <Chips
              options={groups}
              value={customGroup ? undefined : group}
              onPick={(g) => {
                setGroup(g);
                setCustomGroup("");
              }}
            />
            <input
              value={customGroup}
              onChange={(e) => setCustomGroup(e.target.value)}
              placeholder="새 묶음 이름 (예: 베란다)"
              className="field mt-2 max-w-xs py-2 text-base"
            />
          </div>
          <label className="block">
            <span className="mb-1.5 block text-lg font-semibold">제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={laundry ? "예: 수건 빨래" : "예: 화장실 청소"}
              className="field text-xl"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-lg font-semibold">한 줄 설명</span>
            <input value={intro} onChange={(e) => setIntro(e.target.value)} placeholder="예: 수건은 다른 빨래랑 따로!" className="field" />
          </label>
          <div>
            <span className="mb-1.5 block text-lg font-semibold">아이콘</span>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(GUIDE_ICONS) as GuideIconName[]).map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setIcon(name)}
                  title={GUIDE_ICONS[name].label}
                  className={`cursor-pointer rounded-xl border-2 p-1.5 ${icon === name ? "border-clay bg-clay-soft" : "border-transparent hover:bg-card"}`}
                >
                  <GuideIcon name={name} size={40} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-lg font-semibold">사진 (선택)</span>
              <PhotoButton recipeId={guide?.id ?? "new"} label={image ? "다른 사진으로 바꾸기" : "사진 올리기"} onUploaded={(url) => setImage(url)} />
            </div>
            {image && (
              <div className="relative aspect-[4/3] max-w-xs overflow-hidden rounded-xl border-2 border-clay bg-card">
                <Image src={image} alt="올린 사진" fill sizes="320px" className="object-contain" />
                <button
                  type="button"
                  onClick={() => setImage(undefined)}
                  className="absolute top-2 right-2 cursor-pointer rounded-full bg-card px-3 py-0.5 text-sm font-semibold hover:bg-clay hover:text-white"
                >
                  사진 빼기
                </button>
              </div>
            )}
          </div>
        </div>

        {meta.scheduled && (
          <Block title="얼마나 자주" hint="주기를 정해두면 첫 화면 '오늘 할 일'에 때맞춰 올라와요.">
            <Chips
              options={[...SCHEDULE_PRESETS.map((p) => p.label), "정하지 않음"]}
              value={
                schedule
                  ? SCHEDULE_PRESETS.find((p) => p.s.every === schedule.every && p.s.unit === schedule.unit)?.label
                  : "정하지 않음"
              }
              onPick={(l) => setSchedule(SCHEDULE_PRESETS.find((p) => p.label === l)?.s)}
            />
            <div className="mt-3 flex items-center gap-2 text-lg">
              <span>직접:</span>
              <input
                type="number"
                min={1}
                max={365}
                value={schedule?.every ?? ""}
                onChange={(e) => setSchedule({ every: Math.max(1, Number(e.target.value) || 1), unit: schedule?.unit ?? "day" })}
                className="field w-20 py-2 text-center"
                aria-label="몇"
              />
              <select
                value={schedule?.unit ?? "day"}
                onChange={(e) => setSchedule({ every: schedule?.every ?? 1, unit: e.target.value as ScheduleUnit })}
                className="field w-24 py-2"
                aria-label="단위"
              >
                {(Object.keys(UNIT_LABEL) as ScheduleUnit[]).map((u) => (
                  <option key={u} value={u}>
                    {UNIT_LABEL[u]}
                  </option>
                ))}
              </select>
              <span>에 한 번</span>
            </div>
          </Block>
        )}

        {laundry && (
          <Block title="세탁기 설정" hint="세탁기 버튼을 어떻게 누르는지 골라주세요.">
            <div className="space-y-4">
              {(
                [
                  ["코스", "course", WASHER_COURSES],
                  ["물 온도", "temp", WASHER_TEMPS],
                  ["헹굼", "rinse", WASHER_RINSES],
                  ["탈수", "spin", WASHER_SPINS],
                ] as const
              ).map(([label, key, options]) => (
                <div key={key}>
                  <p className="mb-1.5 font-semibold text-ink-soft">{label}</p>
                  <Chips
                    options={[...options]}
                    value={washer[key]}
                    onPick={(v) => setWasher((w) => ({ ...w, [key]: w[key] === v ? undefined : v }))}
                  />
                </div>
              ))}
              <label className="flex cursor-pointer items-center gap-3 text-lg">
                <input
                  type="checkbox"
                  checked={Boolean(washer.net)}
                  onChange={(e) => setWasher((w) => ({ ...w, net: e.target.checked }))}
                  className="h-6 w-6 accent-[#b75d38]"
                />
                세탁망에 넣기
              </label>
            </div>
          </Block>
        )}

        <Block
          title={laundry ? "넣는 것" : "준비물"}
          hint={laundry ? "세제, 섬유유연제처럼 세탁기에 넣는 걸 골라 양을 적어주세요." : "청소할 때 챙길 도구와 세제를 골라주세요."}
        >
          <div className="flex flex-wrap gap-1.5">
            {SUPPLY_SUGGESTIONS[section].map((name) => {
              const on = supplies.some((s) => s.name === name);
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => toggleSupply(name)}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[15px] ${
                    on ? "border-clay bg-clay-soft font-semibold text-clay-dark" : "border-line-strong bg-card hover:border-clay"
                  }`}
                >
                  {on ? "✓ " : "+ "}
                  {name}
                </button>
              );
            })}
          </div>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (customSupply.trim()) setSupplies((l) => [...l, { name: customSupply.trim() }]);
              setCustomSupply("");
            }}
          >
            <input value={customSupply} onChange={(e) => setCustomSupply(e.target.value)} placeholder="목록에 없는 것 직접 적기" className="field flex-1 py-2.5" />
            <button className="btn-ghost">추가</button>
          </form>
          {supplies.length > 0 && (
            <ul className="mt-4 space-y-2">
              {supplies.map((s, i) => (
                <li key={i} className="flex items-center gap-2 rounded-xl border border-line bg-card px-3 py-2">
                  <span className="flex-1 text-lg font-semibold">{s.name}</span>
                  <input
                    value={s.amount ?? ""}
                    onChange={(e) => setSupplies((l) => l.map((x, j) => (j === i ? { ...x, amount: e.target.value } : x)))}
                    placeholder={laundry ? "양 (예: 1뚜껑)" : "양·메모"}
                    className="field w-40 py-1.5 text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setSupplies((l) => l.filter((_, j) => j !== i))}
                    className="cursor-pointer rounded-full px-2.5 py-1 text-ink-faint hover:bg-clay-soft hover:text-clay-dark"
                    aria-label={`${s.name} 빼기`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Block>

        <Block title={laundry ? "빨래 순서" : "하는 순서"} hint="한 칸에 한 가지씩, 하는 순서대로 적어주세요.">
          <StepList
            steps={steps}
            onChange={setSteps}
            chips={supplies.map((s) => s.name)}
            placeholder={laundry ? "예: 수건만 따로 모아서 세탁기에 넣는다" : "예: 창문을 열고 위에서 아래로 먼지를 턴다"}
          />
        </Block>

        {laundry && (
          <Block title="말리는 법">
            <Chips
              options={DRYING_METHODS}
              value={drying.methods}
              multi
              onPick={(m) =>
                setDrying((d) => ({ ...d, methods: d.methods.includes(m) ? d.methods.filter((x) => x !== m) : [...d.methods, m] }))
              }
            />
            <textarea
              value={drying.note ?? ""}
              onChange={(e) => setDrying((d) => ({ ...d, note: e.target.value }))}
              rows={2}
              placeholder="예: 탈수 끝나면 바로 꺼내서 탁탁 털어 널기"
              className="field mt-3 text-lg"
            />
          </Block>
        )}

        <Block title="엄마의 한마디 (팁)">
          <textarea
            value={tips}
            onChange={(e) => setTips(e.target.value)}
            rows={3}
            placeholder={laundry ? "예: 수건엔 섬유유연제 넣으면 물을 잘 못 먹어" : "예: 락스 쓸 땐 꼭 창문 열고 장갑 껴"}
            className="field text-lg"
          />
        </Block>

        {guide && (
          <div className="border-t border-line pt-6">
            <button
              type="button"
              onClick={() => {
                if (confirm(`'${guide.title}'을(를) 지울까요? 되돌릴 수 없어요.`)) start(() => deleteGuideAction(guide.id));
              }}
              className="cursor-pointer text-[15px] text-ink-faint underline underline-offset-4 hover:text-clay-dark"
            >
              이 항목 지우기
            </button>
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3 sm:px-6">
          <div className="flex-1 text-[15px]">
            {error ? <span className="text-clay-dark">{error}</span> : saved ? <span className="text-sage">저장했어요 ✓</span> : null}
          </div>
          <button onClick={() => save(false)} disabled={pending} className="btn-ghost">
            {pending ? "저장 중…" : "중간 저장"}
          </button>
          <button onClick={() => save(true)} disabled={pending} className="btn-primary">
            다 적었어요
          </button>
        </div>
      </div>
    </div>
  );
}
