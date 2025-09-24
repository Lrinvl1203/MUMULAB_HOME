/**
 * MUMULAB 관리자 인증 시스템
 * 모든 관리자 페이지에서 공통으로 사용하는 인증 로직
 */

// 인증 관련 상수
const ADMIN_AUTH = {
    STORAGE_KEY: 'mumulab_admin_auth',
    PASSWORD: 'mumulab2024!',
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000 // 24시간
};

/**
 * 현재 인증 상태 확인
 */
function isAuthenticated() {
    const authData = sessionStorage.getItem(ADMIN_AUTH.STORAGE_KEY);
    if (!authData) return false;

    try {
        const auth = JSON.parse(authData);
        const now = Date.now();

        // 세션 만료 확인
        if (now > auth.expireTime) {
            sessionStorage.removeItem(ADMIN_AUTH.STORAGE_KEY);
            return false;
        }

        return auth.authenticated === true;
    } catch (error) {
        sessionStorage.removeItem(ADMIN_AUTH.STORAGE_KEY);
        return false;
    }
}

/**
 * 인증 처리
 */
function authenticate(password) {
    if (password === ADMIN_AUTH.PASSWORD) {
        const authData = {
            authenticated: true,
            loginTime: Date.now(),
            expireTime: Date.now() + ADMIN_AUTH.SESSION_TIMEOUT
        };
        sessionStorage.setItem(ADMIN_AUTH.STORAGE_KEY, JSON.stringify(authData));
        return true;
    }
    return false;
}

/**
 * 로그아웃
 */
function logout() {
    // 현재 페이지가 관리자 페이지인지 확인
    const currentPath = window.location.pathname;
    const isAdminPage = currentPath.includes('admin-') || currentPath.includes('blog-admin-');

    // 세션 정리
    sessionStorage.removeItem(ADMIN_AUTH.STORAGE_KEY);
    localStorage.removeItem('mumulab_admin_session'); // 추가 정리

    if (isAdminPage) {
        // 관리자 페이지에서 로그아웃하면 저장된 리퍼러 페이지 또는 기본 페이지로
        const savedReferrer = sessionStorage.getItem('admin_referrer_page');

        if (savedReferrer && !savedReferrer.includes('admin')) {
            // 저장된 리퍼러가 있고 관리자 페이지가 아니면 그곳으로
            sessionStorage.removeItem('admin_referrer_page'); // 사용 후 정리
            window.location.href = savedReferrer;
        } else if (currentPath.includes('/blog/')) {
            // 블로그 서브디렉토리에서 온 경우 블로그 홈으로
            window.location.href = '../blog/index.html';
        } else {
            // 그 외의 경우 메인 홈으로
            window.location.href = 'index.html';
        }
    }
}

/**
 * 관리자 모드 진입 전 페이지 저장
 */
function saveReferrerPage() {
    const currentPath = window.location.pathname;
    const isAdminPage = currentPath.includes('admin-') || currentPath.includes('blog-admin-');

    if (!isAdminPage) {
        // 관리자 페이지가 아닌 경우에만 현재 페이지를 저장
        sessionStorage.setItem('admin_referrer_page', window.location.href);
    }
}

/**
 * 인증 모달 생성 및 표시
 */
function showAuthModal(onSuccess) {
    // 관리자 모드 진입 전 페이지 저장
    saveReferrerPage();
    // 기존 모달이 있다면 제거
    const existingModal = document.getElementById('adminAuthModal');
    if (existingModal) {
        existingModal.remove();
    }

    // 인증 모달 HTML 생성
    const modalHTML = `
        <div id="adminAuthModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-md mx-4 relative">
                <h2 class="text-xl font-bold mb-4 text-center">🔐 관리자 인증</h2>
                <p class="text-gray-600 mb-4 text-center">관리자 비밀번호를 입력하세요</p>

                <div id="authError" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    잘못된 비밀번호입니다.
                </div>

                <div class="mb-4">
                    <label for="adminPassword" class="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
                    <input type="password"
                           id="adminPassword"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                           placeholder="관리자 비밀번호 입력">
                </div>

                <div class="flex space-x-3">
                    <button id="loginBtn" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                        🔓 로그인
                    </button>
                    <button id="cancelBtn" class="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors">
                        ❌ 취소
                    </button>
                </div>

                <div class="mt-4 text-center">
                    <p class="text-xs text-gray-500">세션 유효시간: 24시간</p>
                </div>
            </div>
        </div>
    `;

    // 모달을 DOM에 추가
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 이벤트 리스너 설정
    const modal = document.getElementById('adminAuthModal');
    const passwordInput = document.getElementById('adminPassword');
    const loginBtn = document.getElementById('loginBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const authError = document.getElementById('authError');

    // 비밀번호 입력 필드에 포커스
    setTimeout(() => passwordInput.focus(), 100);

    // 로그인 처리 함수
    function handleLogin() {
        const password = passwordInput.value;

        if (authenticate(password)) {
            modal.remove();
            if (typeof onSuccess === 'function') {
                onSuccess();
            }
        } else {
            authError.classList.remove('hidden');
            passwordInput.value = '';
            passwordInput.focus();

            // 에러 메시지 3초 후 숨김
            setTimeout(() => {
                authError.classList.add('hidden');
            }, 3000);
        }
    }

    // 취소 처리 함수
    function handleCancel() {
        modal.remove();
        // 이전 페이지로 돌아가기 (또는 홈으로)
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    }

    // 이벤트 리스너
    loginBtn.addEventListener('click', handleLogin);
    cancelBtn.addEventListener('click', handleCancel);

    // Enter 키로 로그인
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });

    // ESC 키로 취소
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('adminAuthModal')) {
            handleCancel();
        }
    });

    // 모달 외부 클릭으로 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            handleCancel();
        }
    });
}

/**
 * 관리자 페이지 보호 (페이지 로드 시 호출)
 */
function protectAdminPage(onAuthSuccess) {
    if (isAuthenticated()) {
        // 이미 인증된 상태
        if (typeof onAuthSuccess === 'function') {
            onAuthSuccess();
        }
        return true;
    } else {
        // 인증 필요
        showAuthModal(onAuthSuccess);
        return false;
    }
}

/**
 * 관리자 페이지로 안전하게 이동 (인증 확인 후)
 */
function navigateToAdminPage(url, target = '_self') {
    if (isAuthenticated()) {
        // 이미 인증된 상태 - 바로 이동
        if (target === '_blank') {
            window.open(url, '_blank');
        } else {
            window.location.href = url;
        }
    } else {
        // 인증 필요 - 로그인 후 이동
        showAuthModal(() => {
            if (target === '_blank') {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
        });
    }
}

/**
 * 인증 상태 정보 가져오기
 */
function getAuthInfo() {
    const authData = sessionStorage.getItem(ADMIN_AUTH.STORAGE_KEY);
    if (!authData) return null;

    try {
        const auth = JSON.parse(authData);
        const remaining = auth.expireTime - Date.now();

        return {
            authenticated: auth.authenticated,
            loginTime: new Date(auth.loginTime),
            expireTime: new Date(auth.expireTime),
            remainingTime: remaining,
            remainingHours: Math.floor(remaining / (60 * 60 * 1000))
        };
    } catch (error) {
        return null;
    }
}

// 전역 변수로 내보내기 (window 객체에 추가)
if (typeof window !== 'undefined') {
    window.AdminAuth = {
        isAuthenticated,
        authenticate,
        logout,
        showAuthModal,
        protectAdminPage,
        navigateToAdminPage,
        getAuthInfo,
        saveReferrerPage
    };
}