import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

// 아이디/비밀번호는 GitHub Secrets(MOMCIPE_ID, MOMCIPE_PW) → 배포 시 서버 환경변수로만 들어온다.
// 브라우저로는 절대 내려보내지 않는다 (NEXT_PUBLIC_ 금지).

export const SESSION_COOKIE = "momcipe_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30일: 엄마가 자주 다시 로그인하지 않도록

function credentials() {
  const id = process.env.MOMCIPE_ID;
  const pw = process.env.MOMCIPE_PW;
  return id && pw ? { id, pw } : null;
}

function key() {
  const c = credentials();
  if (!c) return null;
  // 비밀번호를 바꾸면 기존 로그인도 자동으로 풀리도록 비밀번호에서 서명 키를 만든다.
  const extra = process.env.MOMCIPE_SESSION_SECRET ?? "";
  return createHash("sha256").update(`momcipe:${c.id}:${c.pw}:${extra}`).digest();
}

function same(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function loginConfigured() {
  return credentials() !== null;
}

export async function checkLogin(id: string, pw: string) {
  const c = credentials();
  if (!c) return false;
  // 둘 다 비교해서 어느 쪽이 틀렸는지 시간으로 드러나지 않게 한다.
  const okId = same(id.trim(), c.id);
  const okPw = same(pw, c.pw);
  return okId && okPw;
}

export async function startSession() {
  const k = key()!;
  const token = await new SignJWT({ role: "mom" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(k);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function isEditor() {
  const k = key();
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!k || !token) return false;
  try {
    await jwtVerify(token, k, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}
