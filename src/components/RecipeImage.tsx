import Image from "next/image";
import type { Category } from "@/lib/types";

const TINT: Record<Category, { bg: string; soup: string }> = {
  guk: { bg: "#f4e6d2", soup: "#e9c99a" },
  jjigae: { bg: "#f3dccf", soup: "#d9805b" },
  yori: { bg: "#efe0cc", soup: "#b8784a" },
  banchan: { bg: "#e9ead6", soup: "#9fae78" },
};

/** 사진이 없을 때 쓰는 그릇 그림 */
function Placeholder({ category, name }: { category: Category; name: string }) {
  const t = TINT[category];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1" style={{ background: t.bg }}>
      <svg viewBox="0 0 120 80" className="w-2/5 max-w-36" fill="none" stroke="#5a4232" strokeWidth="2" strokeLinecap="round">
        <path d="M44 22c0-6 6-6 6-12M60 20c0-6 6-6 6-12M76 22c0-6 6-6 6-12" strokeOpacity=".5" />
        <path d="M14 38h92c0 18-20 30-46 30S14 56 14 38Z" fill="#fffaf2" />
        <ellipse cx="60" cy="38" rx="46" ry="7" fill={t.soup} />
        <path d="M44 72h32" />
      </svg>
      <span className="sr-only">{name}</span>
    </div>
  );
}

export function RecipeImage({
  src,
  name,
  category,
  sizes,
  priority,
}: {
  src?: string;
  name: string;
  category: Category;
  sizes: string;
  priority?: boolean;
}) {
  if (!src) return <Placeholder category={category} name={name} />;
  // 사진은 자르지 않고 칸 안에 통째로 맞춘다. 남는 여백은 같은 사진을 흐리게 깔아 채운다.
  return (
    <>
      <Image src={src} alt="" aria-hidden fill sizes="64px" className="scale-110 object-cover opacity-60 blur-xl" />
      <Image src={src} alt={name} fill sizes={sizes} priority={priority} className="object-contain" />
    </>
  );
}

/** 상세 페이지 대표 사진: 칸 비율에 맞추지 않고 사진 원래 비율 그대로 보여준다 */
export function RecipeHeroImage({ src, name, category }: { src?: string; name: string; category: Category }) {
  if (!src) {
    return (
      <div className="aspect-[16/9]">
        <Placeholder category={category} name={name} />
      </div>
    );
  }
  return (
    <>
      <Image src={src} alt="" aria-hidden fill sizes="64px" className="scale-110 object-cover opacity-50 blur-2xl" />
      <Image
        src={src}
        alt={name}
        width={1600}
        height={1200}
        sizes="(min-width: 768px) 720px, 100vw"
        priority
        className="relative mx-auto block h-auto max-h-[75vh] w-auto max-w-full"
      />
    </>
  );
}
