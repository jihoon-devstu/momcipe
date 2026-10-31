import { redirect } from "next/navigation";
import { isEditor } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "엄마 로그인" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const raw = (await searchParams).next;
  const next = raw?.startsWith("/") && !raw.startsWith("//") ? raw : "/";
  if (await isEditor()) redirect(next);
  return (
    <div className="mx-auto max-w-md px-4 pt-16 sm:pt-24">
      <h1 className="font-serif text-3xl font-bold">엄마 로그인</h1>
      <p className="mt-2 text-ink-soft">레시피를 새로 적거나 고치려면 로그인해 주세요.</p>
      <LoginForm next={next} />
    </div>
  );
}
