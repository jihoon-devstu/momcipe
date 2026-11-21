import { redirect } from "next/navigation";
import { isEditor } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "로그인" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const raw = (await searchParams).next;
  const next = raw?.startsWith("/") && !raw.startsWith("//") ? raw : "/";
  if (await isEditor()) redirect(next);
  return (
    <div className="mx-auto max-w-md px-4 pt-16 sm:pt-24">
      <h1 className="font-serif text-3xl font-bold">로그인</h1>
      <p className="mt-2 text-ink-soft">살림 노트를 적거나 &lsquo;오늘 했어요&rsquo;를 기록하려면 로그인해 주세요.</p>
      <LoginForm next={next} />
    </div>
  );
}
