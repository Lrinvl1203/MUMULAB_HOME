#!/bin/bash
# AI 생산성 블로그 포스트 생성 스크립트

set -e

CURRENT_TOPIC="$1"
CURRENT_INDEX="$2"
DATE=$(date +%Y-%m-%d)
FILENAME="${DATE}-$(echo "$CURRENT_TOPIC" | sed 's/[^a-zA-Z0-9가-힣 ]//g' | sed 's/ /-/g').html"

# 블로그 디렉토리 생성
mkdir -p blog/posts

echo "📝 블로그 포스트 생성: $FILENAME"

# HTML 포스트 생성
cat > "blog/posts/$FILENAME" << 'EOF'
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
    </style>
</head>
<body>
    <div class="blog-post">
        <header>
            <h1>${CURRENT_TOPIC}</h1>
            <div class="post-meta">
                <span>📅 ${DATE}</span>
                <span>📂 AI 생산성</span>
                <span>⭐ 시리즈 $((CURRENT_INDEX + 1))/30</span>
            </div>
        </header>

        <main>
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

# 파일에서 템플릿 변수 치환
sed -i "s/\${CURRENT_TOPIC}/$CURRENT_TOPIC/g" "blog/posts/$FILENAME"
sed -i "s/\${DATE}/$DATE/g" "blog/posts/$FILENAME"
sed -i "s/\${CURRENT_INDEX}/$CURRENT_INDEX/g" "blog/posts/$FILENAME"

echo "✅ 블로그 포스트 생성 완료: $FILENAME"
echo "title=$CURRENT_TOPIC"
echo "filename=$FILENAME"
echo "next_index=$((CURRENT_INDEX + 1))"
echo "completed=false"