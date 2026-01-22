# Outlook Translator - GitHub 및 Vercel 연결 가이드

## 🔗 GitHub 저장소 연결 및 Vercel 배포

### 1단계: GitHub 저장소 확인/생성

#### 기존 저장소가 있는 경우:
```bash
# 원격 저장소 추가
git remote add origin https://github.com/skt-yusung/outlook-translator.git

# (만약 이미 origin이 있다면)
git remote set-url origin https://github.com/skt-yusung/outlook-translator.git
```

#### 새 저장소를 만들어야 하는 경우:

1. https://github.com/new 접속
2. Repository name: `outlook-translator`
3. Public 선택
4. **"Add a README file" 체크 해제** (이미 로컬에 파일이 있으므로)
5. Create repository 클릭
6. 생성된 페이지의 명령어 복사:

```bash
# 예시 (본인의 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/outlook-translator.git
git branch -M main
git push -u origin main
```

### 2단계: GitHub에 푸시

```bash
cd /Users/1113757/Desktop/SKT/2025~_biz_client_개발팀/outlook-translator

# 원격 저장소 추가 (위에서 복사한 명령어 사용)
git remote add origin https://github.com/skt-yusung/outlook-translator.git

# main 브랜치로 변경 (필요한 경우)
git branch -M main

# 푸시
git push -u origin main
```

### 3단계: Vercel에 GitHub 저장소 연결

#### Vercel Dashboard에서:

1. https://vercel.com/dashboard 접속
2. 기존 `outlook-translator` 프로젝트 선택
3. Settings → Git 메뉴
4. "Connect Git Repository" 클릭
5. GitHub 선택 및 인증
6. `outlook-translator` 저장소 선택
7. Connect 클릭

또는 **새로 Import**:

1. https://vercel.com/new 접속
2. "Import Git Repository"
3. GitHub에서 `outlook-translator` 선택
4. Import 클릭
5. 환경변수 설정:
   - `OPENAI_API_KEY` 입력
6. Deploy 클릭

### 4단계: 자동 배포 확인

이제부터:
```bash
# 코드 수정 후
git add .
git commit -m "Update feature"
git push
```

하면 **Vercel이 자동으로 감지하고 재배포**합니다! 🎉

---

## 📋 완료 후 체크리스트

- [ ] GitHub 저장소 생성/연결 완료
- [ ] 코드 푸시 완료
- [ ] Vercel에서 GitHub 저장소 연결 완료
- [ ] Vercel 환경변수 (`OPENAI_API_KEY`) 설정 완료
- [ ] 자동 배포 성공 확인
- [ ] Outlook Add-in 테스트 성공

---

## 🚀 현재 상태

✅ 로컬에 Git 저장소 초기화 완료
✅ 모든 파일 커밋 완료
⏳ **다음 단계: GitHub에 푸시 및 Vercel 연결**

GitHub에 푸시하고 Vercel 환경변수만 설정하면 바로 사용 가능합니다!
