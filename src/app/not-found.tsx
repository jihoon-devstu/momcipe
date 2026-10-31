import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 pt-24 text-center">
      <p className="font-serif text-3xl font-bold">레시피를 찾을 수 없어요</p>
      <p className="mt-2 text-ink-soft">지워졌거나 주소가 바뀌었을 수 있어요.</p>
      <Link href="/" className="btn-primary mt-8">
        목록으로
      </Link>
    </div>
  );
}
