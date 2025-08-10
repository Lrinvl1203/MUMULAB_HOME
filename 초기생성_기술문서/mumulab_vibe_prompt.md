# 🚀 MUMULAB - Cursor Claude Code Vibe Prompt

아래 프롬프트를 Cursor에서 Claude Code에 그대로 전달하세요. 이 프롬프트는 Linear.app의 구조/디자인을 최대한 그대로 따르는 MUMULAB 웹앱의 뼈대를 App Router 기반 Next.js로 생성합니다.

---

목표: Linear.app와 동일한 네비게이션/레이아웃/톤을 갖춘 "MUMULAB" 웹앱 스캐폴드 생성 (App Router, TS, Tailwind, shadcn/ui)

요구사항:
1) 프로젝트 생성
- Next.js(App Router) + TypeScript + Tailwind
- 패키지: shadcn/ui, Radix UI, lucide-react, class-variance-authority, tailwind-merge, framer-motion, zustand
- 설정: ESLint/Prettier, path alias(@/)

2) 디자인 시스템(Linear 스타일)
- 색상: primary 600 = #7c3aed, gray 900 = #18181b 등 (TRD의 팔레트 사용)
- 폰트: 시스템 폰트 스택
- 라운드: 6-12px, 얇은 보더, 섬세한 그림자
- 컴포넌트: 버튼, 카드, 드롭다운, 네비게이션 메뉴 (shadcn 기반)

3) 레이아웃 & 네비게이션
- 전역 레이아웃: Header(고정), Main 컨테이너(최대 1280px), Footer(간단)
- Header: 브랜드(MUMULAB), 1차 메뉴 + hover 드롭다운(2차 메뉴)
- 네비 구성(config/navigation.ts) 예시:
  - 아이디어 & 검증: 아이디어 수집, 시장 조사, 경쟁사 분석, 아이디어 검증
  - 계획 & 전략: 비즈니스 모델, 재무 계획, 리소스 계획, 타임라인
  - 개발 & 구축: 제품 로드맵, MVP 계획, 개발 추적, 테스팅
  - 출시 & 성장: GTM 전략, 마케팅 계획, 분석 대시보드, 성장 추적
  - 운영 & 확장: 프로세스 문서화, 팀 관리, 성과 지표, 확장 전략
- 2차 메뉴는 Hover 시 카드형 드롭다운으로 표시(Radix NavigationMenu 활용)

4) 페이지(스텁)
- / (랜딩): Hero, 네비 요약 카드, CTA
- /ideation, /planning, /development, /launch, /operations (섹션 루트)
- 각 섹션 내 4개의 서브 경로만 스텁으로 페이지 생성 (본문은 "Coming soon")

5) 상호작용/접근성
- 키보드 네비게이션/포커스 링
- ARIA 레이블 및 role 속성 적절히 사용
- 다크 테마 기본

6) 코드 품질
- TypeScript 엄격
- 컴포넌트 분리(헤더/내비/푸터/ui)
- 디자인 토큰 분리(styles/design-tokens.ts)
- 상태(Zustand)는 최소 스토어로 토글/프리퍼런스 정도만

7) 산출물
- 컴파일/빌드 가능 상태
- README: 실행/개발 방법
- 커밋 로그: 의미 있는 단위로 나누어 작성

추가 지침(PRD/TRD/Claude.md 반영):
- 로딩/에러/Empty 상태 컴포넌트 자리표시자 포함
- 반응형: 1280/1024/768/375 브레이크포인트
- 퍼포먼스: 코드 분할, 동적 import, 이미지 최적화 설정 스텁

작업 단계(Claude가 순차 실행):
1. create-next-app으로 초기화(typescript/tailwind/app/use-pnpm)
2. tailwind 설정 + globals.css 토큰 적용
3. shadcn/ui 초기화 및 버튼/카드/내비 컴포넌트 추가
4. config/navigation.ts 작성 → Header/Navigation 컴포넌트 연동
5. app/layout.tsx, app/page.tsx(랜딩), 섹션/서브경로 스텁 라우트 생성
6. 접근성/키보드 네비/포커스 스타일 적용
7. README 작성 및 주요 커밋 푸시

검증 기준:
- 헤더 호버 드롭다운이 Linear.app와 유사하게 동작
- 다크 톤/보더/섀도/여백 느낌이 Linear에 근접
- 각 라우트가 정상적으로 전환되고 스켈레톤 텍스트 출력

---

팁: 완료 후 Netlify/Vercel에 배포 설정하고, 리포지토리 main 브랜치에 푸시하면 자동 배포되도록 구성하세요.