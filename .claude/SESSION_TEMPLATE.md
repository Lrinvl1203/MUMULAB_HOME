# Claude Code 세션 시작 가이드

## 🚀 새 세션 시작 시 실행할 명령어

Claude Code를 재시작할 때 다음 명령어들을 순서대로 실행하여 이전 작업 컨텍스트를 복원하세요:

### 1. 프로젝트 상태 확인
```
이전 작업 로그를 보여줘: cat CLAUDE_WORK_LOG.md
```

### 2. Google AdSense 액션 플랜 확인
```
액션 플랜 상태를 확인해줘: cat GOOGLE_ADSENSE_ACTION_PLAN.md
```

### 3. 최근 작업 히스토리 확인
```
최근 커밋 히스토리를 보여줘: git log --oneline -10
```

### 4. 현재 프로젝트 상태 파악
```
현재 git 상태와 진행 중인 작업을 확인해줘
```

## 📋 컨텍스트 복원 템플릿

새 세션에서 다음과 같이 요청하세요:

```
"이전 Claude Code 세션에서 Google AdSense 최적화 작업을 진행했습니다.
CLAUDE_WORK_LOG.md와 GOOGLE_ADSENSE_ACTION_PLAN.md를 확인하고
현재 상태를 파악한 후 다음 단계를 제안해주세요."
```

## 🔄 권장 워크플로우

1. **세션 시작**: 위 템플릿 메시지 전송
2. **상태 파악**: Claude가 로그 파일들을 확인
3. **작업 계속**: 이전 작업의 다음 단계 진행
4. **세션 종료 시**: CLAUDE_WORK_LOG.md 업데이트

## 💡 추가 팁

- 중요한 결정사항은 항상 CLAUDE_WORK_LOG.md에 기록
- 새로운 작업 시작 시 날짜와 목표를 명시
- 오류나 문제 해결 과정도 상세히 기록