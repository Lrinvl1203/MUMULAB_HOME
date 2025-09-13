# 📊 MUMULAB Google Analytics 4 설정 가이드

## 1단계: Google Analytics 계정 설정

### 1.1 Google Analytics 계정 생성
1. [Google Analytics](https://analytics.google.com/) 접속
2. "측정 시작" 클릭
3. 계정 정보 입력:
   - **계정 이름**: MUMULAB
   - **속성 이름**: MUMULAB Website
   - **보고 시간대**: 대한민국
   - **통화**: 한국 원

### 1.2 데이터 스트림 설정
1. "웹" 선택
2. 웹사이트 URL 입력 (예: https://yourdomain.com)
3. 스트림 이름: "MUMULAB Main Site"
4. **측정 ID 복사** (G-XXXXXXXXXX 형태)

## 2단계: 코드 설정

### 2.1 측정 ID 업데이트
다음 파일들에서 `G-XXXXXXXXXX`를 실제 측정 ID로 교체:

**업데이트 필요한 파일:**
- `index.html` (Line 10)
- `app.html` (Line 10)
- `blog/index.html` (Line 10)
- `tools/index.html` (Line 10)
- `analytics.js` (Line 8)

**변경 예시:**
```javascript
// 변경 전
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// 변경 후 (실제 ID로 교체)
const GA_MEASUREMENT_ID = 'G-1234567890';
```

### 2.2 스크립트 태그 업데이트
HTML 파일들의 gtag.js 스크립트 태그도 업데이트:
```html
<!-- 변경 전 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- 변경 후 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1234567890"></script>
```

## 3단계: 추적 이벤트 확인

### 3.1 기본 페이지뷰 추적
- ✅ 홈페이지 방문
- ✅ 블로그 페이지 방문  
- ✅ 도구 페이지 방문

### 3.2 사용자 인터랙션 추적
- ✅ 블로그 카테고리 필터링
- ✅ 블로그 포스트 클릭
- ✅ 도구 앱 실행 (인라인)
- ✅ 도구 앱 전체화면 열기
- ✅ 도구 앱 닫기

### 3.3 커스텀 이벤트
- ✅ 앱 로딩 완료
- ✅ 전체화면 모드 사용
- ✅ 페이지 타입별 분류

## 4단계: 데이터 확인

### 4.1 실시간 데이터 확인
1. Google Analytics 대시보드 접속
2. "실시간" 메뉴 클릭
3. 웹사이트 방문하여 데이터 확인

### 4.2 이벤트 추적 확인
1. "이벤트" 메뉴 클릭
2. 커스텀 이벤트 확인:
   - `tool_interaction`
   - `blog_interaction`
   - `app_launch`
   - `app_loaded`
   - `fullscreen_open`

## 5단계: 고급 설정 (선택사항)

### 5.1 전환 이벤트 설정
도구 사용을 전환으로 설정하여 성과 측정:
1. "구성" > "이벤트" 메뉴
2. "전환으로 표시" 토글 활성화
3. 추천 이벤트: `tool_interaction`, `app_launch`

### 5.2 커스텀 보고서 생성
1. "탐색" 메뉴에서 커스텀 보고서 생성
2. 주요 측정항목:
   - 도구별 사용 빈도
   - 블로그 카테고리별 인기도
   - 사용자 유입 경로

### 5.3 알림 설정
급격한 트래픽 변화나 오류 발생 시 알림:
1. "관리" > "맞춤 알림" 설정
2. 알림 조건 설정 (예: 일일 방문자 50% 증가)

## 6단계: 프라이버시 준수

### 6.1 쿠키 정책
웹사이트에 쿠키 사용 안내 추가 권장:
```html
<!-- 쿠키 알림 예시 -->
<div id="cookie-notice">
  이 사이트는 사용자 경험 개선을 위해 쿠키를 사용합니다.
  <button onclick="acceptCookies()">확인</button>
</div>
```

### 6.2 데이터 보존 설정
Google Analytics에서 데이터 보존 기간 설정:
1. "관리" > "데이터 설정" > "데이터 보존"
2. 권장: 26개월

## 📈 분석 대시보드 활용

### 주요 KPI 모니터링
1. **방문자 수**: 일별/주별/월별 추이
2. **페이지뷰**: 인기 페이지 분석
3. **도구 사용률**: 각 앱별 사용 빈도
4. **사용자 여정**: 유입 → 블로그 → 도구 경로
5. **세션 시간**: 사용자 참여도 측정

### 정기 리포트
- **주간**: 트래픽 변화, 인기 콘텐츠
- **월간**: 도구 사용 트렌드, 사용자 행동 패턴
- **분기별**: 목표 대비 성과, 개선 계획

## 🔧 문제 해결

### 데이터가 표시되지 않는 경우
1. 측정 ID 정확성 확인
2. 브라우저 개발자 도구에서 네트워크 요청 확인
3. 애드블로커 비활성화 후 테스트

### 이벤트가 추적되지 않는 경우
1. 브라우저 콘솔에서 JavaScript 오류 확인
2. `window.Analytics` 객체 로드 확인
3. 이벤트 파라미터 유효성 확인

이제 MUMULAB 웹사이트의 모든 사용자 활동을 체계적으로 추적할 수 있습니다! 🎉