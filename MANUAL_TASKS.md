# 직접 해주셔야 하는 작업

Claude 가 대신 할 수 없는 일(로그인, 콘솔 가입, 비밀값 입력)만 모았습니다. 순서대로 진행하면 됩니다.

## 1. GitHub CLI 설치 · 로그인  ← 지금 필요

```bash
winget install --id GitHub.cli
```

터미널을 새로 연 뒤:

```bash
gh auth login
```

(GitHub.com → HTTPS → 브라우저로 로그인 선택)

- [x] 완료 → 저장소 생성됨: https://github.com/jihoon-devstu/momcipe

## 2. Firebase (Firestore)

1. https://console.firebase.google.com → **프로젝트 추가** (이름: momcipe, 애널리틱스는 꺼도 됨)
2. 왼쪽 **Firestore Database** → **데이터베이스 만들기** → 위치 `asia-northeast3 (서울)` → **프로덕션 모드**
3. **규칙** 탭에 저장소의 `firestore.rules` 내용을 붙여넣고 게시
4. ⚙ **프로젝트 설정 → 서비스 계정 → 새 비공개 키 생성** → JSON 파일 다운로드
   - 이 파일은 저장소 폴더에 두지 마세요 (다운로드 폴더에 그대로)

- [x] 완료

## 3. Vercel

1. https://vercel.com 가입 (GitHub 계정으로)
2. https://vercel.com/account/tokens → 토큰 생성 (이름: momcipe-actions)
3. 프로젝트 폴더에서 아래 명령으로 Vercel 프로젝트를 만들고 연결 (브라우저 로그인 뜸):

```bash
npx vercel link --yes --project momcipe
```

   → `.vercel/project.json` 이 생기면 Claude 가 orgId / projectId 를 읽어 드립니다.

- [x] 완료

## 4. GitHub Secrets 등록

저장소가 만들어진 뒤, 프로젝트 폴더에서 하나씩 실행하면 값을 물어봅니다 (화면/기록에 남지 않음).

```bash
gh secret set MOMCIPE_ID
```

```bash
gh secret set MOMCIPE_PW
```

```bash
gh secret set VERCEL_TOKEN
```

Firebase 키 파일은 base64 로 바꿔서 넣습니다. PowerShell 에서 (파일명은 실제 이름으로):

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$HOME\Downloads\momcipe-firebase-adminsdk-xxxx.json")) | gh secret set FIREBASE_SERVICE_ACCOUNT
```

`VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` 는 3번이 끝나면 Claude 가 넣습니다 (비밀번호가 아닌 식별자라서).

- [x] 완료

## 참고

- git 설정의 이메일이 `https://github.com/jihoon-devstu` (URL) 로 되어 있어 커밋이 GitHub 계정과 연결되지 않습니다.
  고치려면: `git config --global user.email "GitHub에 등록된 이메일"`
