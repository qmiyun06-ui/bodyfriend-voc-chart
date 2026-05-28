# 바디프렌드 VOC 조사

헬스케어로봇 제품·서비스 현장 VOC 수집 및 대시보드 시스템

---

## 📁 파일 구성

```
index.html        → 설문 + 대시보드 메인 파일 (GitHub Pages 배포용)
apps_script.js    → Google Apps Script 백엔드 코드
favicon.ico       → 파비콘 (직접 추가)
README.md         → 이 파일
```

---

## 🚀 배포 방법

### 1단계 — Google Apps Script 설정
1. [Google Sheets](https://sheets.google.com) 열기
2. 상단 메뉴 → **확장 프로그램** → **Apps Script**
3. 기존 코드 전부 삭제 후 `apps_script.js` 내용 붙여넣기
4. 저장 (Ctrl+S)
5. **배포** → **새 배포** → 유형: **웹 앱**
   - 다음 사용자로 실행: **나**
   - 액세스 권한: **모든 사용자**
6. 배포 후 생성된 **웹 앱 URL** 복사

### 2단계 — index.html에 URL 연결
`index.html` 파일에서 아래 부분을 찾아 URL 교체:
```javascript
const API = '여기에_웹앱_URL_붙여넣기';
```

### 3단계 — GitHub Pages 배포
1. GitHub 새 repository 생성
2. `index.html`, `README.md` 업로드
3. Settings → Pages → Branch: **main** → Save
4. 약 1~2분 후 `https://[유저명].github.io/[repo명]` 접속

---

## 📋 설문 구성

| 설문 | 대상 | 척도 | 이론 |
|------|------|------|------|
| A | 라운지 방문 고객 | 7점 | SERVQUAL |
| B | AS 방문 고객 | 7점 | SERVQUAL |
| C | 배송 완료 고객 | 5점 | CMX-LMD |
| D | 라운지 직원 | 5점 + 개방형 | Contextual Inquiry |
| E | 서비스 엔지니어 | 5점 + 개방형 | Contextual Inquiry |
| F | 배송 엔지니어 | 5점 + 개방형 | Contextual Inquiry |

---

## 📊 데이터 흐름

```
설문 응답 (GitHub Pages)
    ↓ POST
Google Apps Script (백엔드)
    ↓ 자동 저장
Google Sheets (Survey_A ~ Survey_F 탭)
    ↓ GET
대시보드 (레이더·도넛·파이 차트 실시간 렌더링)
```

---

## 📚 참고문헌
- Parasuraman, A., Zeithaml, V. A., & Berry, L. L. (1988). SERVQUAL. *Journal of Retailing, 64*(1), 12–40.
- Vrhovac, V. et al. (2023). CMX-LMD scale. *Mathematics, 11*(6), 1482.
- Beyer, H., & Holtzblatt, K. (1997). *Contextual Design.* Morgan Kaufmann.
