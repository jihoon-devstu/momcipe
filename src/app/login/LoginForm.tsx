"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm({ next }: { next: string }) {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="mt-8 space-y-4">
      <input type="hidden" name="next" value={next} />
      <label className="block">
        <span className="mb-1.5 block font-semibold">아이디</span>
        <input name="id" autoComplete="username" required className="field" />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-semibold">비밀번호</span>
        <input name="pw" type="password" autoComplete="current-password" required className="field" />
      </label>
      {error && <p className="rounded-lg bg-clay-soft px-4 py-3 text-clay-dark">{error}</p>}
      <button disabled={pending} className="btn-primary w-full py-3.5 text-lg">
        {pending ? "확인하는 중…" : "로그인"}
      </button>
    </form>
  );
}
