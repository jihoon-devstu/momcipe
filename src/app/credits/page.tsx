import Image from "next/image";
import { IMAGES } from "@/lib/images";

export const metadata = { title: "사진 출처" };

export default function CreditsPage() {
  const list = Object.entries(IMAGES);
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
      <h1 className="font-serif text-3xl font-bold">사진 출처</h1>
      <p className="mt-2 text-ink-soft">
        맘시피의 음식 사진은 모두 자유 이용이 허락된 사진입니다. 사진을 찍어 공유해 주신 분들께 감사드립니다.
      </p>
      <ul className="mt-8 divide-y divide-line">
        {list.map(([id, c]) => (
          <li key={id} className="flex gap-4 py-4">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
              <Image src={c.src} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <div className="min-w-0 text-[15px]">
              <a href={c.source} target="_blank" rel="noreferrer" className="font-semibold break-all hover:text-clay">
                {c.title}
              </a>
              <p className="text-ink-soft">
                {c.author} ·{" "}
                {c.licenseUrl ? (
                  <a href={c.licenseUrl} target="_blank" rel="noreferrer" className="underline">
                    {c.license}
                  </a>
                ) : (
                  c.license
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
