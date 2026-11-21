import type { Metadata, Viewport } from "next";
import { Gowun_Batang } from "next/font/google";
import Link from "next/link";
import { MainNav } from "@/components/MainNav";
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
  title: { default: "맘살림 · 엄마가 알려주는 살림", template: "%s · 맘살림" },
  description: "청소, 빨래, 집안일, 요리까지 엄마가 알려준 살림법을 모아두는 곳",
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
        <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 px-4 sm:px-6 md:h-16 md:flex-nowrap">
            <Link href="/" className="flex h-14 items-baseline gap-2.5 pt-4 md:h-auto md:pt-0">
              <span className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">맘살림</span>
              <span className="hidden text-sm text-ink-faint lg:inline">엄마가 알려주는 살림</span>
            </Link>
            <nav aria-label="갈래" className="order-last -mx-4 flex h-11 w-[calc(100%+2rem)] items-end px-2 md:order-none md:mx-0 md:h-auto md:w-auto md:flex-1 md:px-0">
              <MainNav />
            </nav>
            <div className="flex items-center gap-2">
              {editor ? (
                <>
                  <span className="hidden rounded-full bg-sage-soft px-3 py-1 text-sm font-medium text-sage sm:inline">
                    편집 모드
                  </span>
                  <form action={logout}>
                    <button className="btn px-3 py-2 text-[15px] text-ink-soft hover:text-ink">로그아웃</button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="btn px-3 py-2 text-[15px] text-ink-soft hover:text-clay">
                  로그인
                </Link>
              )}
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mx-auto mt-24 max-w-5xl border-t border-line px-4 py-8 text-sm text-ink-faint sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>엄마한테 배운 살림, 잊어버리지 않게.</p>
            <Link href="/credits" className="underline-offset-4 hover:underline">
              사진 출처
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
