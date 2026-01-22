# Outlook Translator - 배포 가이드

## 🚀 빠른 시작

이 프로젝트는 이미 Vercel에 배포되어 있습니다: 
`https://outlook-translator-1zfg4ifc5-skt-yusungs-projects.vercel.app`

OpenAI API를 사용하여 실시간 번역이 동작하도록 하려면 **환경변수 설정**만 하면 됩니다.

---

## 📝 필수 설정: OpenAI API 키

### 1단계: OpenAI API 키 발급

1. **OpenAI Platform** 접속: https://platform.openai.com/api-keys
2. 로그인 (계정이 없다면 가입)
3. **"Create new secret key"** 클릭
4. 키 이름 입력 (예: `outlook-translator`)
5. **API 키 복사** (⚠️ 이 화면을 닫으면 다시 볼 수 없습니다!)
6. 안전한 곳에 저장

### 2단계: Vercel 환경변수 설정

#### 옵션 A: Vercel Dashboard (추천)

1. **Vercel Dashboard** 접속: https://vercel.com/dashboard
2. 본인의 프로젝트 목록에서 **`outlook-translator`** 클릭
3. 상단 메뉴에서 **Settings** 클릭
4. 왼쪽 메뉴에서 **Environment Variables** 선택
5. **Add New** 버튼 클릭
6. 다음 정보 입력:
   ```
   Name: OPENAI_API_KEY
   Value: (복사한 OpenAI API 키 붙여넣기)
   Environments: Production, Preview, Development 모두 체크
   ```
7. **Save** 클릭

#### 옵션 B: Vercel CLI

```bash
# 1. Vercel CLI 설치 (처음 한 번만)
npm install -g vercel

# 2. 프로젝트 디렉토리로 이동
cd /Users/1113757/Desktop/SKT/2025~_biz_client_개발팀/outlook-translator

# 3. Vercel 로그인
vercel login

# 4. 환경변수 추가
vercel env add OPENAI_API_KEY
# 프롬프트가 나타나면:
# - API 키 입력
# - Production, Preview, Development 모두 선택 (스페이스바로 선택)
# - Enter
```

### 3단계: 재배포

환경변수를 추가한 후에는 **재배포**가 필요합니다.

#### 옵션 A: Git Push (추천)

```bash
# 프로젝트 디렉토리에서
git add .
git commit -m "Add OpenAI API integration"
git push
```

Vercel이 자동으로 감지하고 재배포합니다 (약 1-2분 소요).

#### 옵션 B: Vercel CLI로 수동 배포

```bash
vercel --prod
```

### 4단계: 배포 확인

1. **Vercel Dashboard**에서 배포 상태 확인
2. "Building..." → "Ready" 로 변경되면 완료
3. 배포 URL 클릭하여 접속 테스트: 
   `https://outlook-translator-1zfg4ifc5-skt-yusungs-projects.vercel.app/taskpane`

---

## 🧪 테스트

### Outlook에서 테스트하기

1. **Outlook Web** 접속: https://outlook.office.com
2. **새 메일 작성** 버튼 클릭
3. 제목 입력: "프로젝트 진행 상황 공유"
4. 본문 입력:
   ```
   안녕하세요,
   
   현재 진행 중인 프로젝트 상황을 공유드립니다.
   다음 주 월요일까지 1차 완료 예정입니다.
   
   감사합니다.
   ```
5. 상단 메뉴에서 **"한영 번역"** 버튼 클릭
6. 우측 작업창에서 **실시간 번역 결과** 확인
7. **"복사"** 버튼으로 번역 결과 복사 가능

### API 호출 확인

브라우저 개발자 도구 (F12)를 열고:
- **Console 탭**: 번역 로그 확인
- **Network 탭**: `/api/translate` 호출 확인 (Status: 200 OK)

---

## 💰 비용 안내

**OpenAI GPT-4o-mini** 모델 사용:

- 입력: $0.150 / 1M tokens
- 출력: $0.600 / 1M tokens

**예상 사용량 (평균적인 비즈니스 이메일):**
- 제목 번역: ~50 tokens → $0.00003
- 본문 번역: ~500 tokens → $0.0003
- **1회 번역당 약 $0.0003 (약 ₩0.4)**

**월 100회 사용 시: 약 $0.03 (₩40)**

매우 저렴하지만, 주기적으로 확인:
👉 https://platform.openai.com/usage

---

## 🛠️ 로컬 개발 환경 (선택사항)

로컬에서 개발하거나 테스트하려면:

```bash
# 1. 의존성 설치
npm install

# 2. .env 파일 생성
cp .env.example .env

# 3. .env 파일 편집 (본인의 API 키 입력)
# OPENAI_API_KEY=sk-your-actual-api-key-here

# 4. Vercel 개발 서버 실행
npm run dev
```

그리고 `manifest.xml`의 URL을 임시로 변경:
```xml
<!-- 개발 시 -->
<SourceLocation DefaultValue="http://localhost:3000/taskpane"/>

<!-- 프로덕션 시 (원래대로 복구) -->
<SourceLocation DefaultValue="https://outlook-translator-1zfg4ifc5-skt-yusungs-projects.vercel.app/taskpane"/>
```

---

## 📂 프로젝트 구조

```
outlook-translator/
├── api/
│   └── translate.js         # Vercel Serverless Function (OpenAI API 호출)
├── taskpane.html            # Outlook Add-in UI 및 로직
├── manifest.xml             # Outlook Add-in 설정 파일
├── vercel.json              # Vercel 배포 설정
├── package.json             # Node.js 프로젝트 설정
├── .env.example             # 환경변수 템플릿
├── .gitignore               # Git 제외 파일
└── README.md                # 프로젝트 문서
```

---

## 🔧 문제 해결

### "번역 API 오류" 메시지가 나타남

1. **Vercel Dashboard**에서 환경변수 확인:
   - `OPENAI_API_KEY`가 정확히 등록되어 있는지
   - Production 환경에 적용되어 있는지
   
2. **OpenAI API 키 확인**:
   - https://platform.openai.com/api-keys 에서 키가 활성화되어 있는지
   - 계정에 크레딧이 있는지 (최소 $5 충전 필요)

3. **재배포 확인**:
   - 환경변수 추가 후 재배포했는지 확인

### "CORS 오류" 메시지

- `api/translate.js`에 CORS 헤더가 올바르게 설정되어 있는지 확인
- 이미 설정되어 있으므로 재배포하면 해결됨

### Outlook에서 버튼이 안 보임

- Outlook 재시작
- 추가 기능 관리에서 "메일 번역기" 활성화 확인

---

## 📞 지원

문제가 있거나 개선 사항이 있다면:
1. OpenAI API 문서: https://platform.openai.com/docs
2. Vercel 문서: https://vercel.com/docs
3. Outlook Add-in 문서: https://learn.microsoft.com/en-us/office/dev/add-ins/

---

## ✅ 체크리스트

배포 전 확인사항:

- [ ] OpenAI API 키 발급 완료
- [ ] Vercel 환경변수 설정 완료 (`OPENAI_API_KEY`)
- [ ] Vercel 재배포 완료
- [ ] `/api/translate` 엔드포인트 정상 동작 확인
- [ ] Outlook에서 Add-in 설치 완료
- [ ] 실제 번역 테스트 성공
- [ ] OpenAI 사용량 모니터링 설정

모두 체크되었다면 🎉 **배포 완료!**
