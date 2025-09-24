/**
 * MUMULAB 관리자 모드 글로벌 액세스
 * 모든 페이지에서 Ctrl + Alt + A로 관리자 대시보드 접근
 */

(function() {
    'use strict';

    // 관리자 모드 단축키 이벤트 리스너
    document.addEventListener('keydown', function(e) {
        // Ctrl + Alt + A
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            e.stopPropagation();

            // 현재 페이지가 이미 관리자 페이지인지 확인
            const currentPath = window.location.pathname;
            if (currentPath.includes('admin-dashboard.html')) {
                return; // 이미 관리자 대시보드에 있음
            }

            // 관리자 모드 진입 전 현재 페이지 저장
            if (typeof AdminAuth !== 'undefined' && AdminAuth.saveReferrerPage) {
                AdminAuth.saveReferrerPage();
            } else {
                // AdminAuth가 로드되지 않았으면 직접 저장
                sessionStorage.setItem('admin_referrer_page', window.location.href);
            }

            // 관리자 대시보드로 이동 (상대 경로 계산)
            let adminUrl;

            if (currentPath.includes('/blog/') ||
                currentPath.includes('/tools/') ||
                currentPath.includes('/info/') ||
                currentPath.includes('/support/') ||
                currentPath.includes('/apps/')) {
                // 서브 디렉토리에서 접근
                adminUrl = '../admin-dashboard.html';
            } else {
                // 루트 디렉토리에서 접근
                adminUrl = 'admin-dashboard.html';
            }

            const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
            window.location.href = baseUrl + adminUrl;
        }
    });

    // 페이지 로드 완료 후 관리자 힌트 표시 (개발 모드에서만)
    document.addEventListener('DOMContentLoaded', function() {
        // 개발 환경에서만 힌트 표시 (localhost, file://, 또는 특정 도메인)
        const isDev = window.location.hostname === 'localhost' ||
                     window.location.protocol === 'file:' ||
                     window.location.hostname.includes('127.0.0.1');

        if (isDev && !window.location.pathname.includes('admin')) {
            // 관리자 힌트를 콘솔에만 표시 (SEO 안전)
            console.log('🔐 관리자 모드: Ctrl + Alt + A');
        }
    });
})();