// Breadcrumb Navigation System for MUMULAB
function initBreadcrumb() {
  const path = window.location.pathname;
  const breadcrumbData = {
    '/': { name: '홈', url: '/' },
    '/app.html': { name: '앱', url: '/app.html' },
    '/blog/': { name: '블로그', url: '/blog/' },
    '/blog/index.html': { name: '블로그', url: '/blog/' },
    '/tools/': { name: '도구', url: '/tools/' },
    '/tools/index.html': { name: '도구', url: '/tools/' },
    '/info/': { name: '정보', url: '/info/' },
    '/info/index.html': { name: '정보', url: '/info/' },
    '/info/about.html': { name: '소개', url: '/info/about.html', parent: '/info/' },
    '/info/privacy-policy.html': { name: '개인정보처리방침', url: '/info/privacy-policy.html', parent: '/info/' },
    '/info/terms-of-service.html': { name: '이용약관', url: '/info/terms-of-service.html', parent: '/info/' },
    '/info/sitemap.html': { name: '사이트맵', url: '/info/sitemap.html', parent: '/info/' },
    '/info/faq.html': { name: 'FAQ', url: '/info/faq.html', parent: '/info/' },
    '/support/': { name: '지원', url: '/support/' },
    '/support/index.html': { name: '지원', url: '/support/' }
  };

  // Build breadcrumb trail
  function buildBreadcrumb(currentPath) {
    const trail = [{ name: 'MUMULAB', url: '/', isHome: true }];

    // Handle blog posts
    if (currentPath.includes('/blog/posts/')) {
      trail.push({ name: '블로그', url: '/blog/' });
      const postTitle = document.querySelector('h1')?.textContent || '블로그 포스트';
      trail.push({ name: postTitle, url: currentPath, isCurrent: true });
      return trail;
    }

    // Handle app pages
    if (currentPath.includes('/apps/')) {
      trail.push({ name: '앱', url: '/app.html' });
      const appName = document.querySelector('title')?.textContent?.split(' - ')[0] || '앱';
      trail.push({ name: appName, url: currentPath, isCurrent: true });
      return trail;
    }

    // Handle regular pages
    const currentPage = breadcrumbData[currentPath];
    if (currentPage) {
      if (currentPage.parent) {
        const parentPage = breadcrumbData[currentPage.parent];
        if (parentPage) {
          trail.push({ name: parentPage.name, url: parentPage.url });
        }
      }

      if (!currentPage.url.endsWith('/') || currentPage.url === '/') {
        trail.push({ name: currentPage.name, url: currentPage.url, isCurrent: true });
      } else {
        trail.push({ name: currentPage.name, url: currentPage.url });
      }
    }

    return trail;
  }

  // Render breadcrumb HTML
  function renderBreadcrumb(trail) {
    const breadcrumbHTML = trail.map((item, index) => {
      const isLast = index === trail.length - 1;
      const separator = index > 0 ? '<span class="breadcrumb-separator">›</span>' : '';

      if (item.isHome) {
        return `<a href="${item.url}" class="breadcrumb-home">🏠</a>`;
      } else if (item.isCurrent || isLast) {
        return `${separator}<span class="breadcrumb-current">${item.name}</span>`;
      } else {
        return `${separator}<a href="${item.url}" class="breadcrumb-link">${item.name}</a>`;
      }
    }).join('');

    return `<nav class="breadcrumb" aria-label="Breadcrumb navigation">${breadcrumbHTML}</nav>`;
  }

  // Add breadcrumb styles
  function addBreadcrumbStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .breadcrumb {
        padding: 12px 0;
        margin-bottom: 24px;
        font-size: 14px;
        color: var(--text-secondary, #888);
      }
      .breadcrumb a {
        color: var(--text-secondary, #888);
        text-decoration: none;
      }
      .breadcrumb a:hover {
        color: var(--text-primary, #fff);
        text-decoration: underline;
      }
      .breadcrumb-home {
        font-size: 16px;
      }
      .breadcrumb-separator {
        margin: 0 8px;
        color: var(--text-muted, #666);
      }
      .breadcrumb-current {
        color: var(--text-primary, #fff);
        font-weight: 500;
      }
      .breadcrumb-link {
        transition: color 0.2s ease;
      }
    `;
    document.head.appendChild(style);
  }

  // Insert breadcrumb into page
  function insertBreadcrumb() {
    const trail = buildBreadcrumb(path);
    if (trail.length <= 1) return; // Don't show breadcrumb on home page

    const breadcrumbHTML = renderBreadcrumb(trail);

    // Find insertion point (after header, before main content)
    const container = document.querySelector('.container');
    const blogContainer = document.querySelector('.blog-container');
    const mainContent = container || blogContainer;

    if (mainContent) {
      const firstChild = mainContent.firstElementChild;
      if (firstChild) {
        firstChild.insertAdjacentHTML('afterend', breadcrumbHTML);
      } else {
        mainContent.insertAdjacentHTML('afterbegin', breadcrumbHTML);
      }
    }
  }

  // Add structured data for breadcrumb
  function addBreadcrumbSchema(trail) {
    if (trail.length <= 1) return;

    const breadcrumbListItems = trail.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://mumulabshome.netlify.app${item.url}`
    }));

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbListItems
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // Initialize
  addBreadcrumbStyles();
  const trail = buildBreadcrumb(path);
  insertBreadcrumb();
  addBreadcrumbSchema(trail);
}

// Execute when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBreadcrumb);
} else {
  initBreadcrumb();
}