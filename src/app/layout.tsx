import type { Metadata, Viewport } from "next";
import { Gowun_Batang } from "next/font/google";
import Link from "next/link";
import { isEditor } from "@/lib/auth";
import { logout } from "./actions";
import "./globals.css";

const gowun = Gowun_Batang({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: false,
  variable: "--font-gowun",
});

export const metadata: Metadata = {
  title: { default: "맘시피 · 엄마의 부엌 노트", template: "%s · 맘시피" },
  description: "엄마가 해주던 국, 찌개, 요리, 반찬 레시피를 모아두는 곳",
};

export const viewport: Viewport = {
  themeColor: "#fbf6ee",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const editor = await isEditor();
  return (
    <html lang="ko" className={gowun.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-dvh">
        <header className="border-b border-line bg-paper/90 backdrop-blur-sm sticky top-0 z-30">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-baseline gap-2.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">맘시피</span>
              <span className="hidden text-sm text-ink-faint sm:inline">엄마의 부엌 노트</span>
            </Link>
            <nav className="flex items-center gap-2">
              {editor ? (
                <>
                  <span className="hidden rounded-full bg-sage-soft px-3 py-1 text-sm font-medium text-sage sm:inline">
                    편집 모드
                  </span>
                  <Link href="/recipes/new" className="btn-primary px-4 py-2 text-[15px]">
                    + 새 레시피
                  </Link>
                  <form action={logout}>
                    <button className="btn px-3 py-2 text-[15px] text-ink-soft hover:text-ink">로그아웃</button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="btn px-3 py-2 text-[15px] text-ink-soft hover:text-clay">
                  엄마 로그인
                </Link>
              )}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mx-auto mt-24 max-w-5xl border-t border-line px-4 py-8 text-sm text-ink-faint sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>우리 집 밥상, 엄마 손맛 그대로.</p>
            <Link href="/credits" className="underline-offset-4 hover:underline">
              사진 출처
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
