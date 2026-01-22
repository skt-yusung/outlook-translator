# GitHub 인증 문제 해결 (403 에러)

## 🚨 문제
```
remote: Support for password authentication was removed on August 13, 2021.
fatal: Authentication failed for 'https://github.com/...'
```

## ✅ 해결 방법: Personal Access Token 사용

### 1단계: GitHub Personal Access Token 생성

1. **GitHub 접속**: https://github.com/settings/tokens
2. 로그인
3. **"Generate new token"** → **"Generate new token (classic)"** 클릭
4. 설정:
   ```
   Note: outlook-translator
   Expiration: 90 days (또는 원하는 기간)
   
   권한 (Scopes):
   ✅ repo (전체 체크)
   ✅ workflow
   ```
5. 페이지 하단의 **"Generate token"** 클릭
6. 🔑 **생성된 토큰 복사** (⚠️ 이 화면을 닫으면 다시 볼 수 없습니다!)
   - 예: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
7. 안전한 곳에 저장

### 2단계: Git 자격 증명 업데이트

#### 옵션 A: HTTPS URL 사용 (간단)

```bash
# 프로젝트 디렉토리에서
cd /Users/1113757/Desktop/SKT/2025~_biz_client_개발팀/outlook-translator

# 원격 저장소 URL 확인
git remote -v

# 만약 저장소가 아직 설정되지 않았다면:
git remote add origin https://github.com/skt-yusung/outlook-translator.git

# 또는 이미 있다면 URL 변경:
git remote set-url origin https://github.com/skt-yusung/outlook-translator.git

# 푸시 (Personal Access Token 입력 요청됨)
git push -u origin main
```

**푸시할 때:**
- Username: `skt-yusung` (본인의 GitHub 사용자명)
- Password: `ghp_xxxxxxxxxxxx...` (복사한 Personal Access Token 붙여넣기)

#### 옵션 B: macOS Keychain에 저장 (편리함)

```bash
# Git credential helper 설정
git config --global credential.helper osxkeychain

# 푸시
git push -u origin main

# Username과 Token 입력 후, macOS Keychain에 저장됨
# 다음부터는 자동으로 인증됩니다
```

#### 옵션 C: URL에 토큰 포함 (빠르지만 덜 안전)

```bash
# 원격 URL에 토큰 포함
git remote set-url origin https://ghp_YOUR_TOKEN_HERE@github.com/skt-yusung/outlook-translator.git

# 푸시 (인증 없이 바로 동작)
git push -u origin main
```

⚠️ **주의**: 이 방법은 토큰이 `.git/config` 파일에 평문으로 저장되므로 공유하지 마세요!

---

## 🔐 해결 방법 2: SSH 키 사용 (더 안전)

### 1단계: SSH 키 생성

```bash
# SSH 키 생성
ssh-keygen -t ed25519 -C "your_email@example.com"

# Enter 3번 (기본 위치, 비밀번호 없음)
```

### 2단계: SSH 키 GitHub에 등록

```bash
# 공개 키 복사
cat ~/.ssh/id_ed25519.pub

# 출력된 내용 전체 복사 (ssh-ed25519로 시작)
```

1. **GitHub 접속**: https://github.com/settings/keys
2. **"New SSH key"** 클릭
3. Title: `Mac Desktop`
4. Key: (복사한 공개 키 붙여넣기)
5. **"Add SSH key"** 클릭

### 3단계: Git 원격 URL을 SSH로 변경

```bash
# 원격 URL 변경
git remote set-url origin git@github.com:skt-yusung/outlook-translator.git

# 푸시
git push -u origin main
```

---

## 🚀 해결 방법 3: GitHub CLI 사용 (가장 쉬움)

```bash
# 1. GitHub CLI 설치 (Homebrew)
brew install gh

# 2. 로그인
gh auth login

# 프롬프트 선택:
# - GitHub.com
# - HTTPS
# - Y (credentials)
# - Login with a web browser
# → 브라우저에서 코드 입력하여 인증

# 3. 푸시
git push -u origin main
```

---

## ⚡ 빠른 해결 (추천)

**가장 빠른 방법**:

```bash
# 1. Personal Access Token 생성
# https://github.com/settings/tokens/new
# - Note: outlook-translator
# - Expiration: 90 days
# - Scopes: repo ✅
# - Generate token 클릭
# - 토큰 복사

# 2. Git credential helper 설정
git config --global credential.helper osxkeychain

# 3. 푸시
cd /Users/1113757/Desktop/SKT/2025~_biz_client_개발팀/outlook-translator
git push -u origin main

# 4. 프롬프트에서:
# Username: skt-yusung
# Password: (복사한 토큰 붙여넣기)
```

다음부터는 자동으로 인증됩니다! 🎉

---

## 📝 체크리스트

- [ ] GitHub Personal Access Token 생성
- [ ] Git credential helper 설정
- [ ] Token으로 푸시 성공
- [ ] macOS Keychain에 저장 확인

---

## 💡 팁

**Token을 분실했다면?**
- GitHub Settings → Developer settings → Personal access tokens
- 기존 토큰 삭제 후 새로 생성

**Token 만료되었다면?**
- 같은 곳에서 새 토큰 생성
- 다시 푸시하면 새 토큰으로 업데이트됨

---

문제가 계속되면 에러 메시지를 공유해주세요!
