# Outlook 메일 번역기

Outlook에서 작성 중인 메일을 한영/영한 번역하는 Add-in.

## 기능

- 메일 제목/본문 자동 번역
- 언어 자동 감지 (한글 ↔ 영어)
- OpenAI GPT-4o-mini 기반 번역
- 복사 버튼

## 구조

- Frontend: `taskpane.html` (Vercel Static)
- Backend: `api/translate.js` (Vercel Serverless)
- URL: https://outlook-translator.vercel.app
- OpenAI function calling으로 제목/본문 번역을 1회 API 호출로 처리

## 설치 방법

### 1. Vercel 환경변수 설정

1. https://vercel.com/dashboard 접속
2. `outlook-translator` 프로젝트 선택
3. Settings → Environment Variables
4. 환경변수 추가:
   - Name: `OPENAI_API_KEY`
   - Value: OpenAI API 키
   - Environments: Production, Preview, Development 모두 선택
5. Save

### 2. Outlook에 Add-in 등록

Mac 데스크탑 앱에서는 직접 등록이 불가능하므로 웹 버전 사용.

1. https://aka.ms/olksideload 접속 및 로그인
2. 일반 → 추가 기능 관리
3. 내 추가 기능 → 사용자 지정 추가 기능 추가 → 파일에서 추가
4. `manifest.xml` 선택
5. 설치

### 3. 사용

1. 새 메일 작성
2. 제목 및 본문 입력
3. 상단 메뉴에서 "한영 번역" 버튼 클릭
4. 우측 작업창에서 번역 결과 확인
5. 복사 버튼으로 결과 복사

## 로컬 개발

```bash
# 의존성 설치
npm install

# .env.local 파일 생성 및 OPENAI_API_KEY 값 입력

# 개발 서버 실행
npx vercel dev
```

디자인 확인만 할 경우:
- 브라우저에서 `taskpane.html` 직접 열기
- 또는 https://outlook-translator.vercel.app/taskpane.html?mock=true 접속

## 배포

```bash
git add .
git commit -m "commit message"
git push
```

main 브랜치에 push하면 Vercel에서 자동 배포.

## 지원 환경

- Windows Outlook Desktop
- Mac Outlook Desktop
- Outlook Web

## API 사용량

https://platform.openai.com/usage 에서 확인.

- 모델: gpt-4o-mini
- 비용: 요청당 약 $0.0001 ~ $0.0005
