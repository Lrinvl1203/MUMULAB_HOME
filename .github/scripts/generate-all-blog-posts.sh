#!/bin/bash
# 모든 AI 생산성 블로그 포스트 한번에 생성 스크립트

set -e

echo "📝 30개 AI 생산성 블로그 포스트 일괄 생성 시작..."

# 시작 날짜 (오늘부터)
START_DATE=$(date +%Y-%m-%d)
START_TIMESTAMP=$(date -d "$START_DATE" +%s)

# 블로그 주제 배열
TOPICS=(
  "AI로 하루 1시간 절약하기 - 일정 관리 자동화"
  "스마트폰으로 시작하는 AI 생산성 - 필수 앱 5선"
  "AI 음성인식으로 업무 효율 10배 높이기"
  "ChatGPT로 이메일 작성 시간 90% 단축하기"
  "AI 요약 도구로 정보 과부하 해결하기"
  "개인 맞춤형 AI 비서 만들기 - GPT 커스텀 활용법"
  "AI 번역으로 글로벌 소통의 벽 허물기"
  "AI로 10분 만에 프레젠테이션 완성하기"
  "AI 이미지 생성으로 콘텐츠 제작 혁신하기"
  "AI 글쓰기 도구로 블로그 포스팅 자동화하기"
  "AI 동영상 편집으로 유튜브 콘텐츠 제작 가속화"
  "AI 음악 생성으로 개인 브랜딩 사운드 만들기"
  "AI 코딩 어시스턴트로 프로그래밍 생산성 극대화"
  "AI 디자인 도구로 전문가급 그래픽 디자인하기"
  "AI 데이터 분석으로 개인 패턴 발견하기"
  "AI 예측 모델로 개인 목표 달성률 높이기"
  "AI 추천 시스템으로 효율적인 학습 경로 설계하기"
  "AI 재정 관리로 스마트한 가계부 운영하기"
  "AI 건강 모니터링으로 웰빙 라이프 실현하기"
  "AI 트렌드 분석으로 투자 인사이트 얻기"
  "AI 경력 분석으로 커리어 로드맵 그리기"
  "AI 워크플로우 자동화로 반복 업무 제로 만들기"
  "개인용 AI 챗봇 구축으로 24시간 어시스턴트 만들기"
  "AI 통합 대시보드로 모든 정보 한눈에 관리하기"
  "AI 피드백 루프로 지속적인 개인 성장 시스템 만들기"
  "AI 협업 도구로 팀 생산성 10배 향상시키기"
  "AI 보안 도구로 개인정보 및 디지털 자산 보호하기"
  "2024년 주목해야 할 신흥 AI 도구 10선"
  "AI 윤리와 개인 생산성의 균형점 찾기"
  "AI 시대의 새로운 생산성 패러다임"
)

# blog/posts 디렉토리 생성
mkdir -p blog/posts

GENERATED_COUNT=0

for i in "${!TOPICS[@]}"; do
    # 각 포스트의 날짜 계산 (하루씩 증가)
    POST_TIMESTAMP=$((START_TIMESTAMP + i * 86400))
    POST_DATE=$(date -d "@$POST_TIMESTAMP" +%Y-%m-%d)

    CURRENT_TOPIC="${TOPICS[$i]}"
    FILENAME="${POST_DATE}-$(echo "$CURRENT_TOPIC" | sed 's/[^a-zA-Z0-9가-힣 ]//g' | sed 's/ /-/g').html"

    echo "📄 생성 중: $FILENAME"

    # HTML 포스트 생성
    cat > "blog/posts/$FILENAME" << EOF
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CURRENT_TOPIC} - MUMULAB</title>
    <meta name="description" content="AI 생산성 향상을 위한 실용적인 가이드와 도구 활용법">
    <meta name="keywords" content="AI, 생산성, 인공지능, 자동화, 효율성">
    <link rel="stylesheet" href="../../style.css">
    <style>
        .blog-post {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
            background: #fff;
            color: #333;
        }
        .post-meta {
            color: #666;
            margin-bottom: 2rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 1rem;
        }
        h1, h2, h3 { color: #2563eb; }
        h2 { border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-top: 2rem; }
        ul { margin-left: 1.5rem; margin-bottom: 1rem; }
        li { margin-bottom: 0.5rem; }

        /* 날짜 기반 표시/숨김 처리 */
        .date-locked {
            display: none;
        }
        .coming-soon {
            text-align: center;
            padding: 4rem 2rem;
            background: #f8f9fa;
            border-radius: 8px;
            margin: 2rem 0;
        }
    </style>
    <script>
        // 날짜 기반 콘텐츠 표시 제어
        document.addEventListener('DOMContentLoaded', function() {
            const postDate = new Date('$POST_DATE');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            postDate.setHours(0, 0, 0, 0);

            const content = document.getElementById('post-content');
            const comingSoon = document.getElementById('coming-soon');

            if (postDate <= today) {
                // 날짜가 되면 콘텐츠 표시
                content.style.display = 'block';
                comingSoon.style.display = 'none';
            } else {
                // 날짜가 안 되면 Coming Soon 표시
                content.style.display = 'none';
                comingSoon.style.display = 'block';

                // 남은 일수 계산
                const diffTime = postDate - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                document.getElementById('days-remaining').textContent = diffDays;
                document.getElementById('release-date').textContent = postDate.toLocaleDateString('ko-KR');
            }
        });
    </script>
</head>
<body>
    <div class="blog-post">
        <header>
            <h1>${CURRENT_TOPIC}</h1>
            <div class="post-meta">
                <span>📅 ${POST_DATE}</span>
                <span>📂 AI 생산성</span>
                <span>⭐ 시리즈 $((i + 1))/30</span>
            </div>
        </header>

        <!-- Coming Soon 메시지 -->
        <div id="coming-soon" class="coming-soon">
            <h2>🔒 준비 중인 콘텐츠</h2>
            <p>이 글은 <strong id="release-date"></strong>에 공개됩니다.</p>
            <p>📅 <span id="days-remaining"></span>일 후에 만나보세요!</p>
            <div style="margin-top: 2rem;">
                <p>🎯 <strong>미리보기:</strong> ${CURRENT_TOPIC}</p>
                <p>💡 AI 생산성 향상을 위한 실용적인 팁과 도구를 소개합니다.</p>
            </div>
        </div>

        <!-- 실제 콘텐츠 (날짜가 되면 표시) -->
        <main id="post-content" style="display: none;">
            <h2>개요</h2>
            <p>현대 사회에서 AI 기술을 활용한 생산성 향상은 선택이 아닌 필수가 되었습니다.
            이 가이드에서는 <strong>${CURRENT_TOPIC}</strong>에 대한 실용적인 방법과 도구들을 소개합니다.</p>

            <h2>주요 기능</h2>
            <ul>
                <li><strong>효율성 극대화</strong>: AI 도구를 활용한 업무 프로세스 최적화</li>
                <li><strong>시간 절약</strong>: 반복적인 작업의 자동화를 통한 시간 확보</li>
                <li><strong>품질 향상</strong>: AI 어시스턴트를 통한 작업 품질 개선</li>
            </ul>

            <h2>실행 단계</h2>

            <h3>1단계: 현재 상황 분석</h3>
            <p>자신의 현재 워크플로우를 분석하고 개선이 필요한 영역을 파악합니다.</p>

            <h3>2단계: 적절한 AI 도구 선택</h3>
            <p>목적에 맞는 AI 도구를 선택하고 기본 설정을 완료합니다.</p>

            <h3>3단계: 점진적 도입</h3>
            <p>작은 단위부터 시작하여 점진적으로 AI 도구 사용 범위를 확장합니다.</p>

            <h3>4단계: 최적화 및 개선</h3>
            <p>사용 경험을 바탕으로 설정을 최적화하고 워크플로우를 개선합니다.</p>

            <h2>실제 활용 사례</h2>
            <p>많은 사용자들이 이미 이러한 AI 도구들을 활용하여 생산성을 크게 향상시키고 있습니다.
            각자의 상황에 맞게 적용해보시고, 지속적으로 개선해 나가시기 바랍니다.</p>

            <h2>주의사항</h2>
            <ul>
                <li>⚠️ AI 도구에 과도하게 의존하지 않도록 주의</li>
                <li>💡 개인정보 보호에 신경 쓰며 사용</li>
                <li>🔧 정기적인 도구 업데이트 및 설정 점검</li>
            </ul>

            <h2>마무리</h2>
            <p><strong>${CURRENT_TOPIC}</strong>를 통해 여러분의 일상 생산성이 크게 향상되기를 바랍니다.
            꾸준한 학습과 적용을 통해 AI 시대에 맞는 새로운 업무 방식을 만들어가세요.</p>
        </main>

        <footer>
            <br><hr><br>
            <p>📝 <strong>MUMULAB AI 생산성 시리즈</strong> - 매일 새로운 AI 활용법을 소개합니다.</p>
            <a href="../index.html">← 블로그 목록으로 돌아가기</a>
        </footer>
    </div>
</body>
</html>
EOF

    GENERATED_COUNT=$((GENERATED_COUNT + 1))
    echo "✅ 완료: $FILENAME ($((i + 1))/30)"
done

echo ""
echo "🎉 모든 블로그 포스트 생성 완료!"
echo "📊 총 생성된 파일: ${GENERATED_COUNT}개"
echo "📅 게시 기간: $START_DATE ~ $(date -d "@$((START_TIMESTAMP + 29 * 86400))" +%Y-%m-%d)"
echo ""
echo "🔧 시스템 작동 방식:"
echo "- 모든 포스트가 미리 생성되어 있음"
echo "- 각 포스트는 지정된 날짜에 자동으로 공개됨"
echo "- 공개 전까지는 'Coming Soon' 메시지 표시"
echo "- JavaScript로 클라이언트 사이드에서 날짜 확인"