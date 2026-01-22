# 🚀 초간단 로컬 확인 방법

## 가장 쉬운 방법: HTML 파일 직접 열기

그냥 `taskpane.html` 파일을 **더블클릭**하거나 브라우저로 드래그하면 됩니다!

### 1. Finder에서 열기
```
1. Finder에서 taskpane.html 파일 찾기
2. 더블클릭 (기본 브라우저로 열림)
```

### 2. 브라우저에서 직접 열기
```
1. Chrome/Safari 실행
2. File → Open File... (⌘ + O)
3. taskpane.html 선택
```

### 3. 주소창에 입력
```
file:///Users/1113757/Desktop/SKT/2025~_biz_client_개발팀/outlook-translator/taskpane.html
```

---

## ✅ 확인 가능한 것

- ✅ **디자인**: 흰검 톤의 깔끔한 UI
- ✅ **레이아웃**: 카드, 버튼, 스피너 등
- ✅ **로딩 상태**: 로딩 스피너 애니메이션
- ✅ **재시도 버튼**: 아이콘과 버튼 디자인
- ✅ **반응형**: 창 크기 조절 시 레이아웃 변화

---

## ❌ 확인 불가능한 것

- ❌ **실제 번역**: Office.js API가 없어서 메일 읽기 불가
- ❌ **API 호출**: `/api/translate` 엔드포인트 없음

**하지만** 디자인과 레이아웃만 확인하려면 이것만으로 충분합니다!

---

## 🧪 Mock 데이터로 테스트하기 (선택사항)

브라우저에서 HTML 파일을 열고, **개발자 도구** (F12)의 Console에 붙여넣기:

```javascript
// Office API Mock
window.Office = {
    HostType: { Outlook: 'Outlook' },
    AsyncResultStatus: { Succeeded: 'succeeded' },
    CoercionType: { Text: 'text' },
    context: {
        mailbox: {
            item: {
                subject: {
                    getAsync: (callback) => {
                        callback({ status: 'succeeded', value: '프로젝트 진행 상황' });
                    }
                },
                body: {
                    getAsync: (type, callback) => {
                        callback({ 
                            status: 'succeeded', 
                            value: '안녕하세요,\n\n프로젝트가 잘 진행되고 있습니다.\n\n감사합니다.' 
                        });
                    }
                }
            }
        }
    },
    onReady: (callback) => callback({ host: 'Outlook' })
};
```

그리고 페이지 **새로고침** (⌘ + R) → 로딩 스피너가 나타납니다!

(API 호출은 실패하지만 UI 흐름은 확인 가능)

---

## 🎨 디자인 변경 후 확인하기

```bash
# 1. taskpane.html 수정
# 2. 브라우저에서 새로고침 (⌘ + R)
# 끝!
```

서버 필요 없이 즉시 확인 가능합니다! 🎉

---

## 📋 요약

**UI만 확인**: 그냥 HTML 파일 더블클릭 ⭐
**실제 API까지 테스트**: `npm run dev` 실행

대부분의 경우 HTML 파일만 열어서 확인하면 충분합니다!
