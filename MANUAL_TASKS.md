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

## 5. Vercel Blob (엄마 사진 저장소)  ← 지금 필요

1. https://vercel.com → **momcipe** 프로젝트 → 위쪽 **Storage** 탭
2. **Create Database** → **Blob** → 이름 `momcipe-photos` → 지역은 **Seoul (icn1)** 이 있으면 선택 → **Create**
3. 프로젝트에 연결(Connect)할지 물으면 **momcipe** 에 연결 (환경은 전부 체크해도 됨)
4. 만들어진 스토어 화면의 **.env.local** 탭(또는 Quickstart)에서 `BLOB_READ_WRITE_TOKEN` 값의 **복사 버튼** 클릭
   - 값은 `vercel_blob_rw_` 로 시작합니다. 따옴표는 빼고 값만 복사
5. 맘시피 폴더 터미널(PowerShell)에서:

```powershell
$t=(Get-Clipboard -Raw).Trim().Trim('"'); if ($t -match '^vercel_blob_rw_[A-Za-z0-9_]+$') { gh secret set BLOB_READ_WRITE_TOKEN --body $t; "등록 완료" } else { "형식이 달라요 - vercel_blob_rw_ 로 시작하는 값만 복사해 주세요" }; Remove-Variable t
```

- [ ] 완료

## 참고

- git 설정의 이메일이 `https://github.com/jihoon-devstu` (URL) 로 되어 있어 커밋이 GitHub 계정과 연결되지 않습니다.
  고치려면: `git config --global user.email "GitHub에 등록된 이메일"`
