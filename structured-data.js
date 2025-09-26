// JSON-LD Structured Data for MUMULAB
function addStructuredData() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MUMULAB",
    "url": "https://mumulabshome.netlify.app",
    "description": "AI 생산성 도구와 프로젝트 관리 플랫폼을 제공하는 전문 서비스",
    "foundingDate": "2024",
    "areaServed": "KR",
    "knowsAbout": [
      "AI 도구",
      "생산성 향상",
      "프로젝트 관리",
      "ChatGPT",
      "Claude",
      "GitHub Copilot",
      "디지털 노마드",
      "개발자 도구"
    ],
    "sameAs": [
      "https://mumulabshome.netlify.app/blog/",
      "https://mumulabshome.netlify.app/tools/"
    ]
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MUMULAB",
    "url": "https://mumulabshome.netlify.app",
    "description": "AI 생산성 도구와 프로젝트 관리 플랫폼",
    "inLanguage": "ko-KR",
    "isAccessibleForFree": true,
    "publisher": {
      "@type": "Organization",
      "name": "MUMULAB"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mumulabshome.netlify.app/blog/?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Blog Schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "MUMULAB Blog",
    "url": "https://mumulabshome.netlify.app/blog/",
    "description": "AI 생산성 도구 활용법과 프로젝트 관리 노하우를 다루는 전문 블로그",
    "inLanguage": "ko-KR",
    "publisher": {
      "@type": "Organization",
      "name": "MUMULAB"
    },
    "blogPost": [
      {
        "@type": "BlogPosting",
        "headline": "AI 도구 통합 워크플로우 구축 실전 가이드",
        "url": "https://mumulabshome.netlify.app/blog/posts/2025-09-27-AI-도구-통합-워크플로우-구축-실전-가이드.html",
        "datePublished": "2025-09-27",
        "author": {
          "@type": "Organization",
          "name": "MUMULAB"
        }
      },
      {
        "@type": "BlogPosting",
        "headline": "프로젝트 관리에 AI 활용하기: 실무 적용 사례",
        "url": "https://mumulabshome.netlify.app/blog/posts/2025-09-28-프로젝트-관리에-AI-활용하기-실무-적용-사례.html",
        "datePublished": "2025-09-28",
        "author": {
          "@type": "Organization",
          "name": "MUMULAB"
        }
      }
    ]
  };

  // Add schemas to page
  function addSchema(schema, id) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  addSchema(organizationSchema, 'organization-schema');
  addSchema(websiteSchema, 'website-schema');

  // Add blog schema only on blog pages
  if (window.location.pathname.includes('/blog/')) {
    addSchema(blogSchema, 'blog-schema');
  }
}

// Execute when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addStructuredData);
} else {
  addStructuredData();
}