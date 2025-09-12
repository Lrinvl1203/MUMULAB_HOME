# MUMULAB 블로그 사용 가이드

## 📝 새 블로그 포스트 작성하기

### 방법 1: 직접 HTML 파일 생성 (권장)

1. `blog/posts/` 폴더에 새 HTML 파일을 생성합니다
   - 파일명: `포스트-슬러그.html` (예: `my-new-post.html`)

2. 기존 포스트 파일을 복사해서 템플릿으로 사용합니다

3. 다음 부분들을 수정합니다:
   ```html
   <!-- 메타데이터 -->
   <title>새 포스트 제목 - MUMULAB Blog</title>
   
   <!-- 포스트 헤더 -->
   <span class="post-category">카테고리</span>
   <span>2024-01-16</span>
   <h1 class="post-title">새 포스트 제목</h1>
   <div class="post-summary">포스트 요약</div>
   
   <!-- 포스트 내용 -->
   <div class="post-content">
     <!-- 여기에 실제 내용 작성 -->
   </div>
   ```

4. `blog/index.html` 파일의 `blogPosts` 배열에 새 포스트 정보를 추가합니다:
   ```javascript
   const blogPosts = [
     // 기존 포스트들...
     {
       id: 4,
       title: "새 포스트 제목",
       summary: "포스트 요약",
       category: "tech", // tech, business, life 중 선택
       date: "2024-01-16",
       slug: "my-new-post" // HTML 파일명과 동일
     }
   ];
   ```

### 방법 2: 마크다운 사용 (선택사항)

1. `posts/` 폴더에 `.md` 파일 생성
2. `post-template.html`의 `postMetadata` 객체에 메타데이터 추가
3. 마크다운 파일이 자동으로 HTML로 렌더링됩니다

## 📂 디렉토리 구조

```
blog/
├── index.html              # 블로그 메인 페이지
├── post-template.html      # 마크다운용 템플릿
├── posts/                  # 개별 포스트 파일들
│   ├── mumulab-project-start.html
│   ├── static-site-blog.html
│   └── efficient-work-management.html
├── tech/                   # 카테고리별 페이지 (미래 사용)
├── business/
└── life/
```

## 🎨 스타일링 가이드

### 카테고리별 색상
- **기술**: 파란색 계열
- **비즈니스**: 보라색 계열  
- **일상**: 초록색 계열

### HTML 요소 스타일
```html
<!-- 제목들 -->
<h2>섹션 제목</h2>
<h3>서브섹션 제목</h3>

<!-- 코드 블록 -->
<pre><code>
코드 내용
</code></pre>

<!-- 인라인 코드 -->
<code>코드</code>

<!-- 리스트 -->
<ul>
  <li>항목 1</li>
  <li>항목 2</li>
</ul>

<!-- 강조 -->
<strong>굵은 텍스트</strong>
<em>기울임 텍스트</em>
```

## 🔧 유지보수

### 새 카테고리 추가하기

1. `blog/index.html`에서 `categoryNames` 객체에 추가:
   ```javascript
   const categoryNames = {
     'tech': '기술',
     'business': '비즈니스', 
     'life': '일상',
     'design': '디자인'  // 새 카테고리 추가
   };
   ```

2. 카테고리 필터 버튼 추가:
   ```html
   <a href="#" class="filter-btn" data-category="design">디자인</a>
   ```

### SEO 최적화

각 포스트의 `<head>` 섹션에 메타 태그를 추가하세요:

```html
<meta name="description" content="포스트 요약">
<meta property="og:title" content="포스트 제목">
<meta property="og:description" content="포스트 요약">
<meta property="og:type" content="article">
```

## 📱 반응형 디자인

모든 페이지는 모바일 친화적으로 설계되어 있습니다. 추가 미디어 쿼리가 필요한 경우 `style.css`를 수정하세요.

## 🚀 배포

1. **GitHub Pages**: 저장소를 GitHub에 푸시하고 Pages 설정
2. **Netlify**: 폴더를 드래그 앤 드롭으로 배포
3. **Vercel**: Git 연동으로 자동 배포

## 💡 팁

- 포스트 작성 시 날짜를 최신순으로 정렬하여 추가
- 이미지는 `blog/images/` 폴더를 생성하여 관리
- 긴 포스트의 경우 목차(TOC) 추가 고려
- 정기적으로 블로그 인덱스 업데이트 확인

## 🔍 검색 기능

현재는 클라이언트 사이드 검색만 지원합니다. 더 고급 검색이 필요한 경우:

1. Lunr.js 또는 Fuse.js 라이브러리 사용
2. 정적 사이트 생성기(Jekyll, Hugo) 고려
3. Algolia 같은 검색 서비스 통합

---

궁금한 점이 있으시면 이슈를 생성하거나 문의해 주세요! 🎉