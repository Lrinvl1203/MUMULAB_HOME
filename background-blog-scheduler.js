// Background Blog Scheduler - 백그라운드 자동 실행
// 사용자 인터페이스 없이 백그라운드에서 조용히 실행

class BackgroundBlogScheduler {
  constructor() {
    this.scheduler = null;
    this.isRunning = false;
    this.settings = {
      autoStart: true,
      publishTime: { hour: 9, minute: 0 }, // 오전 9시
      silentMode: true,
      storageKey: 'mumulab_blog_scheduler'
    };

    this.init();
  }

  async init() {
    // 자동 블로그 스케줄러 모듈 동적 로드
    try {
      const module = await import('./ai-productivity-blog-scheduler.js');
      this.scheduler = new module.default();

      // 저장된 설정 로드
      this.loadSettings();

      // 자동 시작이 활성화되어 있으면 스케줄러 시작
      if (this.settings.autoStart) {
        this.startBackground();
      }

      // 페이지 로드 시 한 번만 로그 출력
      this.logOnce('🤖 MUMULAB 자동 블로그 시스템이 백그라운드에서 실행 중입니다.');

    } catch (error) {
      console.warn('자동 블로그 스케줄러 로드 실패:', error);
    }
  }

  startBackground() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.saveSettings();

    // 조용한 모드로 실행
    this.scheduleNextExecution();

    // 상태를 localStorage에 저장
    localStorage.setItem(`${this.settings.storageKey}_running`, 'true');
    localStorage.setItem(`${this.settings.storageKey}_start_time`, new Date().toISOString());
  }

  stopBackground() {
    this.isRunning = false;
    this.saveSettings();

    if (this.nextTimeout) {
      clearTimeout(this.nextTimeout);
    }

    localStorage.setItem(`${this.settings.storageKey}_running`, 'false');
  }

  scheduleNextExecution() {
    if (!this.isRunning) return;

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(this.settings.publishTime.hour, this.settings.publishTime.minute, 0, 0);

    const msUntilExecution = tomorrow.getTime() - now.getTime();

    this.nextTimeout = setTimeout(() => {
      this.executePost();
      this.scheduleNextExecution(); // 다음 실행 예약
    }, msUntilExecution);

    // 다음 실행 시간 저장
    localStorage.setItem(`${this.settings.storageKey}_next_execution`, tomorrow.toISOString());
  }

  executePost() {
    if (!this.scheduler || !this.isRunning) return;

    try {
      const post = this.scheduler.getNextPost();

      if (post) {
        // 조용히 포스트 생성 (콘솔 로그 없음)
        this.createPostSilently(post);

        // 진행 상황 저장
        this.updateProgress();

        // 성공 시에만 간단한 로그
        if (!this.settings.silentMode) {
          console.log(`✅ 블로그 포스트 자동 생성: ${post.title}`);
        }

      } else {
        // 모든 포스트 완료 시 자동 정지
        this.stopBackground();
        this.logOnce('🎉 AI 생산성 블로그 시리즈 30개 모두 완성!');
      }

    } catch (error) {
      console.error('자동 포스트 생성 오류:', error);
    }
  }

  createPostSilently(post) {
    // 실제 블로그 시스템에 포스트 생성 (조용한 모드)
    const postData = {
      ...post,
      timestamp: new Date().toISOString(),
      automated: true
    };

    // localStorage에 생성된 포스트 저장
    const existingPosts = JSON.parse(localStorage.getItem(`${this.settings.storageKey}_posts`) || '[]');
    existingPosts.push(postData);
    localStorage.setItem(`${this.settings.storageKey}_posts`, JSON.stringify(existingPosts));

    // 실제 구현 시 여기에 API 호출 또는 파일 생성 로직 추가
    // 예: await this.uploadToServer(postData);
  }

  updateProgress() {
    const progress = {
      currentIndex: this.scheduler.currentIndex,
      totalPosts: this.scheduler.blogSeries.length,
      lastUpdate: new Date().toISOString(),
      isRunning: this.isRunning
    };

    localStorage.setItem(`${this.settings.storageKey}_progress`, JSON.stringify(progress));
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem(this.settings.storageKey);
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      }

      // 실행 상태 복원
      const wasRunning = localStorage.getItem(`${this.settings.storageKey}_running`) === 'true';
      if (wasRunning) {
        this.isRunning = true;
      }
    } catch (error) {
      console.warn('설정 로드 실패:', error);
    }
  }

  saveSettings() {
    try {
      localStorage.setItem(this.settings.storageKey, JSON.stringify(this.settings));
    } catch (error) {
      console.warn('설정 저장 실패:', error);
    }
  }

  // 중복 로그 방지를 위한 일회성 로그
  logOnce(message) {
    const logKey = `${this.settings.storageKey}_logged`;
    const hasLogged = localStorage.getItem(logKey);

    if (!hasLogged) {
      console.log(message);
      localStorage.setItem(logKey, 'true');
    }
  }

  // 상태 조회 (관리자 전용)
  getStatus() {
    const progress = JSON.parse(localStorage.getItem(`${this.settings.storageKey}_progress`) || '{}');
    const nextExecution = localStorage.getItem(`${this.settings.storageKey}_next_execution`);
    const posts = JSON.parse(localStorage.getItem(`${this.settings.storageKey}_posts`) || '[]');

    return {
      isRunning: this.isRunning,
      progress,
      nextExecution: nextExecution ? new Date(nextExecution) : null,
      generatedPosts: posts.length,
      latestPost: posts[posts.length - 1] || null
    };
  }

  // 관리자 제어 인터페이스 (콘솔에서만 사용 가능)
  admin = {
    start: () => this.startBackground(),
    stop: () => this.stopBackground(),
    status: () => this.getStatus(),
    setSilentMode: (silent) => {
      this.settings.silentMode = silent;
      this.saveSettings();
    },
    setAutoStart: (auto) => {
      this.settings.autoStart = auto;
      this.saveSettings();
    },
    reset: () => {
      localStorage.removeItem(`${this.settings.storageKey}_running`);
      localStorage.removeItem(`${this.settings.storageKey}_progress`);
      localStorage.removeItem(`${this.settings.storageKey}_posts`);
      localStorage.removeItem(`${this.settings.storageKey}_logged`);
      console.log('🔄 백그라운드 스케줄러 상태가 초기화되었습니다.');
    }
  };
}

// 자동 시작 (페이지 로드 시)
let backgroundScheduler;

if (typeof window !== 'undefined') {
  // 브라우저 환경에서만 실행
  document.addEventListener('DOMContentLoaded', async () => {
    backgroundScheduler = new BackgroundBlogScheduler();

    // 관리자 액세스를 위한 전역 변수 (개발자 콘솔에서만 접근 가능)
    if (window.location.search.includes('admin=true')) {
      window.blogAdmin = backgroundScheduler.admin;
      console.log('🔧 관리자 모드 활성화: window.blogAdmin 사용 가능');
    }
  });
}

export default BackgroundBlogScheduler;