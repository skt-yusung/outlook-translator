GitHub Pages를 이용한 Outlook Add-in 설치 방법

준비물
GitHub 계정
taskpane.html 파일
manifest.xml 파일
1단계: GitHub Pages 설정
Repository 생성
https://github.com/new 접속
Repository name 입력 (예: outlook-translator)
Public 선택
"Add a README file" 체크
Create repository 클릭
파일 업로드
Add file → Upload files 클릭
taskpane.html 파일 드래그앤드롭
Commit changes 클릭
GitHub Pages 활성화
Settings → Pages 메뉴
Branch: main 선택
Folder: / (root) 선택
Save 클릭
5분 대기
URL 확인
Pages 화면에서 URL 확인
형식: https://USERNAME.github.io/REPO_NAME/taskpane
브라우저에서 URL 접속하여 정상 작동 확인
2단계: manifest.xml 생성
아래 템플릿을 복사하여 manifest.xml 파일로 저장.

수정 필요 항목:

YOUR_USERNAME → 본인 GitHub 사용자명
REPO_NAME → Repository 이름
총 2곳 수정 필요
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<OfficeApp xmlns="http://schemas.microsoft.com/office/appforoffice/1.1"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xmlns:bt="http://schemas.microsoft.com/office/officeappbasictypes/1.0"
           xmlns:mailappor="http://schemas.microsoft.com/office/mailappversionoverrides/1.0"
           xsi:type="MailApp">
  <Id>12345678-1234-1234-1234-123456789abc</Id>
  <Version>1.0.0.0</Version>
  <ProviderName>Your Company</ProviderName>
  <DefaultLocale>ko-KR</DefaultLocale>
  <DisplayName DefaultValue="메일 번역기"/>
  <Description DefaultValue="작성 중인 메일을 한영 번역합니다"/>
  <IconUrl DefaultValue="https://raw.githubusercontent.com/OfficeDev/Office-Add-in-samples/main/Samples/hello-world/outlook-hello-world/assets/icon-64.png"/>
  <HighResolutionIconUrl DefaultValue="https://raw.githubusercontent.com/OfficeDev/Office-Add-in-samples/main/Samples/hello-world/outlook-hello-world/assets/icon-128.png"/>
  <SupportUrl DefaultValue="https://yourcompany.com"/>
  
  <Hosts>
    <Host Name="Mailbox"/>
  </Hosts>
  
  <Requirements>
    <Sets>
      <Set Name="Mailbox" MinVersion="1.1"/>
    </Sets>
  </Requirements>
  
  <FormSettings>
    <Form xsi:type="ItemRead">
      <DesktopSettings>
        <!-- 수정 위치 1 -->
        <SourceLocation DefaultValue="https://YOUR_USERNAME.github.io/REPO_NAME/taskpane"/>
        <RequestedHeight>250</RequestedHeight>
      </DesktopSettings>
    </Form>
  </FormSettings>
  
  <Permissions>ReadWriteItem</Permissions>
  
  <Rule xsi:type="RuleCollection" Mode="Or">
    <Rule xsi:type="ItemIs" ItemType="Message" FormType="Edit"/>
    <Rule xsi:type="ItemIs" ItemType="Appointment" FormType="Edit"/>
  </Rule>
  
  <DisableEntityHighlighting>false</DisableEntityHighlighting>

  <VersionOverrides xmlns="http://schemas.microsoft.com/office/mailappversionoverrides" xsi:type="VersionOverridesV1_0">
    <VersionOverrides xmlns="http://schemas.microsoft.com/office/mailappversionoverrides/1.1" xsi:type="VersionOverridesV1_1">
      <Requirements>
        <bt:Sets DefaultMinVersion="1.5">
          <bt:Set Name="Mailbox"/>
        </bt:Sets>
      </Requirements>
      
      <Hosts>
        <Host xsi:type="MailHost">
          <DesktopFormFactor>
            <ExtensionPoint xsi:type="MessageComposeCommandSurface">
              <OfficeTab id="TabDefault">
                <Group id="msgComposeGroup">
                  <Label resid="GroupLabel"/>
                  <Control xsi:type="Button" id="translateButton">
                    <Label resid="TranslateButtonLabel"/>
                    <Supertip>
                      <Title resid="TranslateButtonLabel"/>
                      <Description resid="TranslateButtonTooltip"/>
                    </Supertip>
                    <Icon>
                      <bt:Image size="16" resid="Icon.16x16"/>
                      <bt:Image size="32" resid="Icon.32x32"/>
                      <bt:Image size="80" resid="Icon.80x80"/>
                    </Icon>
                    <Action xsi:type="ShowTaskpane">
                      <SourceLocation resid="Taskpane.Url"/>
                    </Action>
                  </Control>
                </Group>
              </OfficeTab>
            </ExtensionPoint>
          </DesktopFormFactor>
        </Host>
      </Hosts>
      
      <Resources>
        <bt:Images>
          <bt:Image id="Icon.16x16" DefaultValue="https://raw.githubusercontent.com/OfficeDev/Office-Add-in-samples/main/Samples/hello-world/outlook-hello-world/assets/icon-16.png"/>
          <bt:Image id="Icon.32x32" DefaultValue="https://raw.githubusercontent.com/OfficeDev/Office-Add-in-samples/main/Samples/hello-world/outlook-hello-world/assets/icon-32.png"/>
          <bt:Image id="Icon.80x80" DefaultValue="https://raw.githubusercontent.com/OfficeDev/Office-Add-in-samples/main/Samples/hello-world/outlook-hello-world/assets/icon-80.png"/>
        </bt:Images>
        <bt:Urls>
          <!-- 수정 위치 2 -->
          <bt:Url id="Taskpane.Url" DefaultValue="https://YOUR_USERNAME.github.io/REPO_NAME/taskpane"/>
        </bt:Urls>
        <bt:ShortStrings>
          <bt:String id="GroupLabel" DefaultValue="번역"/>
          <bt:String id="TranslateButtonLabel" DefaultValue="한영 번역"/>
        </bt:ShortStrings>
        <bt:LongStrings>
          <bt:String id="TranslateButtonTooltip" DefaultValue="작성 중인 메일을 한영 번역합니다"/>
        </bt:LongStrings>
      </Resources>
    </VersionOverrides>
  </VersionOverrides>
</OfficeApp>
URL 형식 주의사항:

https://로 시작
URL 끝에 .html 확장자 포함 여부는 실제 접속 테스트로 확인
2곳 모두 동일한 URL 사용
3단계: Outlook 등록
Mac 데스크탑 → 최신 버전에서는 추가 기능 클릭 시, microsoft marketplace로 넘어가게 설정되어서 불가능
(https://support.microsoft.com/en-us/office/use-add-ins-in-outlook-for-mac-f8a88e41-9dcd-4686-9123-fef983cc8d41)

웹 버전 사용해서 등록
https://aka.ms/olksideload 접속 및 로그인
기다리면 자동으로 열림
일반 → 추가 기능 관리
왼쪽 탭에서, "내 추가 기능" 클릭
사용자 지정 추가 기능 추가
파일에서 추가
manifest.xml 선택
설치 클릭
사용 방법 (웹 & 데스크탑앱 둘 다 가능)
새 메일 작성
제목 및 본문 입력
상단 메뉴에서 "메일 번역기" 버튼 클릭

우측 작업창에서 번역 결과 확인
복사 버튼으로 결과 복사
문제 해결
"이 앱을 설치할 수 없습니다"
manifest.xml의 URL이 https://로 시작하는지 확인
2곳 모두 URL을 수정했는지 확인
브라우저에서 해당 URL 접속 테스트
"추가 기능 오류" 또는 X-Frame-Options 오류
GitHub Pages가 활성화되었는지 확인 (Settings → Pages)
5분 이상 대기 후 재시도
브라우저에서 GitHub Pages URL 직접 접속 테스트
버튼이 보이지 않음
Outlook 재시작
추가 기능 관리에서 "메일 번역기" 설치 여부 확인
작업창이 비어있음
F12 개발자 도구 → Console 탭에서 오류 확인
Network 탭에서 taskpane 파일 로딩 여부 확인
파일 수정
GitHub repository로 이동
taskpane.html 클릭
연필 아이콘(Edit) 클릭
수정 후 Commit changes
5분 대기 후 Outlook에서 확인
## OpenAI API 설정 및 배포

### 1. OpenAI API 키 발급

1. https://platform.openai.com/api-keys 접속
2. 로그인 후 "Create new secret key" 클릭
3. API 키 복사 (나중에 다시 볼 수 없으니 안전한 곳에 저장)

### 2. Vercel 환경변수 설정

**방법 1: Vercel Dashboard 사용**
1. https://vercel.com/dashboard 접속
2. `outlook-translator` 프로젝트 선택
3. Settings → Environment Variables
4. 새 환경변수 추가:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: (복사한 OpenAI API 키)
   - **Environments**: Production, Preview, Development 모두 선택
5. Save 클릭

**방법 2: Vercel CLI 사용**
```bash
# Vercel CLI 설치 (한 번만)
npm install -g vercel

# 프로젝트 디렉토리에서 실행
vercel env add OPENAI_API_KEY
# API 키 입력 후 엔터
# Production, Preview, Development 선택
```

### 3. 재배포

환경변수 추가 후 재배포가 필요합니다:

```bash
# Git으로 푸시하거나
git add .
git commit -m "Add OpenAI API integration"
git push

# 또는 Vercel CLI로 직접 배포
vercel --prod
```

### 4. 동작 확인

1. Outlook에서 새 메일 작성
2. 제목과 본문 입력 (한글 또는 영문)
3. "한영 번역" 버튼 클릭
4. 우측 작업창에서 실시간 OpenAI 번역 결과 확인

### 5. API 사용량 모니터링

- https://platform.openai.com/usage 에서 API 사용량 확인
- 예상 비용:
  - 모델: gpt-4o-mini
  - 제목 번역: ~$0.0001 per request
  - 본문 번역: ~$0.0005 per request
  - 매우 저렴하지만 정기적으로 확인 권장

### 로컬 개발 환경 설정 (선택사항)

로컬에서 테스트하려면:

```bash
# 1. 의존성 설치
npm install

# 2. .env 파일 생성
echo "OPENAI_API_KEY=your-api-key-here" > .env

# 3. Vercel 개발 서버 실행
npm run dev
```

그런 다음 `manifest.xml`의 URL을 `http://localhost:3000/taskpane`으로 변경하여 테스트할 수 있습니다.

---

## 현재 기능

### ✅ 작동 중
- 메일 제목/본문 읽기
- 언어 자동 감지 (한글 30% 기준)
- **OpenAI GPT-4o-mini를 통한 실시간 번역**
- 복사 기능
- Vercel 서버리스 배포
지원 환경
Windows Outlook Desktop
Mac Outlook Desktop
Web Outlook
요약
1	GitHub Pages 설정	2분
2	manifest.xml 생성	1분
3	Outlook 등록	2분
총 5분 (GitHub Pages 활성화 대기 시간 제외)