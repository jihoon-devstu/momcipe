# 맘살림 (저장소 이름: momcipe)

엄마가 알려주는 살림 노트. 청소 · 빨래 · 기타 집안일 · 요리 네 갈래로 나뉜다.

- **첫 화면**: 주기가 된 집안일이 '오늘 할 일'로 올라오고, '오늘 했어요'로 기록한다.
- **청소 / 기타 집안일** (`/cleaning`, `/chores`): 준비물 · 하는 순서 · 팁 + 주기(매일, 3일, 매주, 매달 …)와 한 날 기록.
- **빨래** (`/laundry`): 세탁기 설정(코스 · 물 온도 · 헹굼 · 탈수 · 세탁망), 넣는 것, 빨래 순서, 말리는 법.
- **요리** (`/cooking`): 국 · 찌개 · 요리 · 반찬 레시피 (예전 맘시피).

## 구성

| | |
|---|---|
| 프레임워크 | Next.js 16 (App Router) + React 19 |
| 스타일 | Tailwind CSS 4 · Pretendard / 고운바탕 |
| DB | Firebase Firestore — `recipes`, `guides` 두 컬렉션 (서버에서 Admin SDK 로만 접근) |
| 로그인 | 아이디/비밀번호 → 서명된 httpOnly 쿠키 (30일) |
| 배포 | GitHub Actions → Vercel CLI |
| 사진 | Wikimedia Commons (CC0 · CC BY · CC BY-SA), 출처는 `/credits` 페이지 |

```
src/
  app/                 페이지와 서버 액션 (actions.ts)
  components/
    IngredientIcon.tsx 재료 아이콘 SVG 모음
    RecipeEditor.tsx   등록·수정 모드 (재료 고르기 → 양념 → 밑재료 → 요리 순서)
  lib/
    ingredients.ts     재료 사전 (그룹, 아이콘, 기본 단위, 부위·종류)
    catalog.ts         처음 DB 가 비었을 때 넣는 기본 레시피 37개
    guides.ts          집안일 가이드 모델, 기본 목록 23개, 주기 계산 (한국 시간 기준)
    store.ts           Firestore / 로컬 파일 저장소
    auth.ts            로그인 세션
    images.ts          사진 출처 (scripts/fetch-images.mjs 가 생성)
```

## 로컬에서 실행

```bash
npm install
npm run dev
```

`.env.local` 에 `MOMCIPE_ID`, `MOMCIPE_PW` 를 넣으면 로그인할 수 있다.
`FIREBASE_SERVICE_ACCOUNT` 가 없으면 레시피는 `.data/recipes.json` 에 저장된다.

## 환경변수 (GitHub Secrets)

| 이름 | 내용 |
|---|---|
| `MOMCIPE_ID` | 엄마 로그인 아이디 |
| `MOMCIPE_PW` | 엄마 로그인 비밀번호 |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase 서비스 계정 JSON 을 base64 로 인코딩한 값 |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob 스토어 토큰 (엄마가 올린 사진 저장) |
| `VERCEL_TOKEN` | Vercel 액세스 토큰 |
| `VERCEL_ORG_ID` | `.vercel/project.json` 의 `orgId` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` 의 `projectId` |

`main` 에 푸시하면 운영 배포, PR 을 열면 미리보기 배포 후 PR 에 주소가 댓글로 달린다.
Vercel 의 Git 자동 배포는 `vercel.json` 에서 꺼두었다 (비밀값이 Actions 를 통해서만 들어가도록).

## 우리 집 사진 올리기

로그인하면 상세 페이지 사진 위에 **사진 바꾸기** 버튼이, 편집 화면 기본 정보에 **우리 집 사진 올리기** 버튼이 생긴다.
휴대폰에선 카메라로 바로 찍거나 앨범에서 고를 수 있다. 브라우저에서 긴 변 1600px JPEG 로 줄여 올리고,
사진을 바꾸면 이전에 올린 사진은 Blob 에서 지운다 (기본 제공 사진은 그대로).
`BLOB_READ_WRITE_TOKEN` 이 없으면 로컬 개발용으로 `public/uploads/` 에 저장한다.

## 사진 다시 받기

`scripts/image-picks.json` 에서 레시피 id → Commons 파일명을 고친 뒤:

```bash
node scripts/fetch-images.mjs scripts/image-picks.json
```

라이선스가 CC0 / Public domain / CC BY / CC BY-SA 가 아니면 자동으로 건너뛴다.
감자국 · 무채국 · 숙주나물은 맞는 무료 사진이 없어 그릇 그림으로 표시된다.
