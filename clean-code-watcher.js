/**
 * MUMULAB Clean Code Watcher
 * 클린 코드 규칙 위반 사항을 감지하고 자동으로 수정 및 커밋하는 시스템
 */

class CleanCodeWatcher {
    constructor() {
        this.rules = {
            // 코드 포맷팅 규칙
            formatting: {
                'trailing-whitespace': /\s+$/gm,
                'multiple-empty-lines': /\n\s*\n\s*\n/g,
                'missing-final-newline': /[^\n]$/,
                'indentation-inconsistency': /^(\t+ | +\t)/gm
            },

            // 네이밍 규칙
            naming: {
                'camelCase-functions': /function\s+[A-Z][a-zA-Z0-9_]*\s*\(/g,
                'kebab-case-files': /[A-Z]/g, // HTML/CSS 파일명용
                'uppercase-constants': /const\s+[a-z][a-zA-Z0-9_]*\s*=/g
            },

            // 보안 규칙
            security: {
                'exposed-passwords': /password\s*[=:]\s*["'][^"']{1,20}["']/gi,
                'hardcoded-tokens': /(token|key|secret)\s*[=:]\s*["'][a-zA-Z0-9]{10,}["']/gi,
                'console-logs': /console\.(log|debug|info|warn)\s*\(/g
            },

            // HTML 규칙
            html: {
                'missing-alt-text': /<img(?![^>]*alt=)[^>]*>/gi,
                'missing-lang-attr': /<html(?![^>]*lang=)[^>]*>/gi,
                'inline-styles': /style\s*=\s*["'][^"']+["']/gi
            },

            // CSS 규칙
            css: {
                'important-overuse': /!\s*important/gi,
                'vendor-prefixes': /-webkit-|-moz-|-ms-|-o-/g,
                'color-keywords': /:\s*(red|blue|green|yellow|black|white)\s*[;}]/gi
            }
        };

        this.autoFixRules = {
            'trailing-whitespace': (content) => content.replace(/\s+$/gm, ''),
            'multiple-empty-lines': (content) => content.replace(/\n\s*\n\s*\n/g, '\n\n'),
            'missing-final-newline': (content) => content.endsWith('\n') ? content : content + '\n',
            'console-logs': (content) => content.replace(/console\.(log|debug|info|warn)\s*\([^)]*\);\s*/g, '')
        };

        this.commitMessages = {
            'formatting': 'style: Fix code formatting issues',
            'naming': 'refactor: Update naming conventions',
            'security': 'security: Remove security vulnerabilities',
            'html': 'fix: Improve HTML accessibility and standards',
            'css': 'style: Optimize CSS properties',
            'auto-fix': 'style: Auto-fix clean code rule violations'
        };
    }

    /**
     * 파일 변경 감지 및 분석
     */
    async watchFiles() {
        console.log('🔍 Clean Code Watcher 시작...');

        // Git으로 변경된 파일 감지
        const changedFiles = await this.getChangedFiles();

        if (changedFiles.length === 0) {
            console.log('✅ 변경된 파일이 없습니다.');
            return;
        }

        console.log(`📁 분석할 파일: ${changedFiles.length}개`);

        const violations = [];

        for (const file of changedFiles) {
            const fileViolations = await this.analyzeFile(file);
            if (fileViolations.length > 0) {
                violations.push({
                    file: file,
                    issues: fileViolations
                });
            }
        }

        if (violations.length > 0) {
            await this.handleViolations(violations);
        } else {
            console.log('✅ 클린 코드 규칙 위반 사항이 없습니다.');
        }
    }

    /**
     * Git으로 변경된 파일 목록 가져오기
     */
    async getChangedFiles() {
        try {
            // 실제 환경에서는 Node.js child_process 사용
            // 여기서는 시뮬레이션
            const mockChangedFiles = [
                'index.html',
                'app.html',
                'blog-admin-editor.html',
                'admin-dashboard.html',
                'style.css'
            ];

            return mockChangedFiles.filter(file =>
                file.endsWith('.html') ||
                file.endsWith('.css') ||
                file.endsWith('.js')
            );
        } catch (error) {
            console.error('Git 파일 목록 가져오기 실패:', error);
            return [];
        }
    }

    /**
     * 개별 파일 분석
     */
    async analyzeFile(filePath) {
        try {
            // 실제로는 파일 시스템에서 읽어오기
            // 여기서는 시뮬레이션
            const content = await this.readFile(filePath);
            const fileType = this.getFileType(filePath);
            const violations = [];

            // 해당 파일 타입에 맞는 규칙 적용
            const applicableRules = this.getApplicableRules(fileType);

            for (const [category, rules] of Object.entries(applicableRules)) {
                for (const [ruleName, pattern] of Object.entries(rules)) {
                    const matches = content.match(pattern);
                    if (matches) {
                        violations.push({
                            category: category,
                            rule: ruleName,
                            count: matches.length,
                            canAutoFix: this.autoFixRules.hasOwnProperty(ruleName)
                        });
                    }
                }
            }

            return violations;
        } catch (error) {
            console.error(`파일 분석 실패 (${filePath}):`, error);
            return [];
        }
    }

    /**
     * 파일 내용 읽기 (시뮬레이션)
     */
    async readFile(filePath) {
        // 실제로는 fs.readFile 사용
        return "<!-- 시뮬레이션 파일 내용 -->";
    }

    /**
     * 파일 타입 감지
     */
    getFileType(filePath) {
        const extension = filePath.split('.').pop().toLowerCase();
        return extension;
    }

    /**
     * 파일 타입에 따른 적용 가능한 규칙 반환
     */
    getApplicableRules(fileType) {
        const rules = {};

        // 모든 파일에 적용되는 규칙
        rules.formatting = this.rules.formatting;

        // 파일 타입별 특화 규칙
        switch (fileType) {
            case 'html':
                rules.html = this.rules.html;
                rules.security = this.rules.security;
                break;
            case 'css':
                rules.css = this.rules.css;
                break;
            case 'js':
                rules.naming = this.rules.naming;
                rules.security = this.rules.security;
                break;
        }

        return rules;
    }

    /**
     * 규칙 위반 사항 처리
     */
    async handleViolations(violations) {
        console.log('⚠️ 클린 코드 규칙 위반 감지:', violations.length, '개 파일');

        // 자동 수정 가능한 위반사항들 처리
        const autoFixableViolations = violations.filter(v =>
            v.issues.some(issue => issue.canAutoFix)
        );

        if (autoFixableViolations.length > 0) {
            console.log('🔧 자동 수정 가능한 위반사항 처리 중...');
            await this.autoFixViolations(autoFixableViolations);
            await this.commitChanges('auto-fix', autoFixableViolations);
        }

        // 수동 수정이 필요한 위반사항들 리포트
        const manualFixViolations = violations.filter(v =>
            v.issues.some(issue => !issue.canAutoFix)
        );

        if (manualFixViolations.length > 0) {
            this.generateViolationReport(manualFixViolations);
        }
    }

    /**
     * 자동 수정 실행
     */
    async autoFixViolations(violations) {
        for (const violation of violations) {
            console.log(`🔧 자동 수정: ${violation.file}`);

            let content = await this.readFile(violation.file);
            let isModified = false;

            for (const issue of violation.issues) {
                if (issue.canAutoFix && this.autoFixRules[issue.rule]) {
                    content = this.autoFixRules[issue.rule](content);
                    isModified = true;
                    console.log(`  ✅ ${issue.rule} 수정 완료`);
                }
            }

            if (isModified) {
                await this.writeFile(violation.file, content);
            }
        }
    }

    /**
     * 파일 쓰기 (시뮬레이션)
     */
    async writeFile(filePath, content) {
        // 실제로는 fs.writeFile 사용
        console.log(`📝 파일 업데이트: ${filePath}`);
    }

    /**
     * 커밋 전 안전성 검사
     */
    async safetyCheck(violations) {
        console.log('🛡️ 커밋 전 안전성 검사 중...');

        const checks = {
            fileCount: violations.length,
            criticalFiles: this.checkCriticalFiles(violations),
            largeChanges: this.checkLargeChanges(violations),
            productionBranch: await this.checkProductionBranch()
        };

        // 안전성 점수 계산 (0-100)
        let safetyScore = 100;

        if (checks.fileCount > 10) safetyScore -= 20;
        if (checks.criticalFiles.length > 0) safetyScore -= 30;
        if (checks.largeChanges) safetyScore -= 25;
        if (checks.productionBranch) safetyScore -= 15;

        console.log(`🔍 안전성 점수: ${safetyScore}/100`);

        if (safetyScore < 70) {
            console.log('⚠️ 안전성 점수가 낮습니다. 수동 검토가 필요합니다.');
            this.generateSafetyReport(checks, violations);
            return false;
        }

        return true;
    }

    /**
     * 중요 파일 확인
     */
    checkCriticalFiles(violations) {
        const criticalPatterns = [
            /package\.json$/,
            /\.env$/,
            /config\./,
            /index\.html$/,
            /\.github\/workflows\//
        ];

        return violations.filter(v =>
            criticalPatterns.some(pattern => pattern.test(v.file))
        );
    }

    /**
     * 대규모 변경사항 확인
     */
    checkLargeChanges(violations) {
        const totalViolations = violations.reduce((sum, v) =>
            sum + v.issues.reduce((issueSum, issue) => issueSum + issue.count, 0), 0
        );

        return totalViolations > 50;
    }

    /**
     * 프로덕션 브랜치 확인
     */
    async checkProductionBranch() {
        // 실제로는 git branch 명령어로 확인
        // 현재는 시뮬레이션
        const currentBranch = 'main'; // git branch --show-current
        return ['main', 'master', 'production'].includes(currentBranch);
    }

    /**
     * 안전성 리포트 생성
     */
    generateSafetyReport(checks, violations) {
        console.log('\n🚨 안전성 검사 리포트');
        console.log('===============================');

        if (checks.criticalFiles.length > 0) {
            console.log('⚠️ 중요 파일 변경 감지:');
            checks.criticalFiles.forEach(v => console.log(`  - ${v.file}`));
        }

        if (checks.largeChanges) {
            console.log('⚠️ 대규모 변경사항 감지');
        }

        if (checks.productionBranch) {
            console.log('⚠️ 프로덕션 브랜치에서 실행 중');
        }

        console.log('\n💡 권장사항:');
        console.log('1. 변경사항을 수동으로 검토하세요');
        console.log('2. 테스트 브랜치에서 먼저 실행하세요');
        console.log('3. 백업을 생성하세요');
    }

    /**
     * Git 커밋 실행
     */
    async commitChanges(changeType, violations) {
        try {
            // 안전성 검사
            const isSafe = await this.safetyCheck(violations);
            if (!isSafe) {
                console.log('❌ 안전성 검사 실패. 자동 커밋이 취소되었습니다.');
                return false;
            }

            const commitMessage = this.commitMessages[changeType] || this.commitMessages['auto-fix'];

            console.log('📦 Git 커밋 실행 중...');
            console.log(`메시지: ${commitMessage}`);

            // 실제 구현에서는 child_process.exec 사용
            const gitCommands = [
                'git add .',
                `git commit -m "${commitMessage}

🤖 Clean Code Watcher Auto-Commit
- 자동으로 감지된 클린 코드 규칙 위반사항 수정
- 실행 시간: ${new Date().toISOString()}
- 수정된 파일: ${violations.length}개
- 안전성 점수: 통과

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"`,
                'git push'
            ];

            for (const command of gitCommands) {
                console.log(`🔄 실행: ${command}`);
                // await exec(command);
            }

            console.log('✅ 자동 커밋 완료!');
            return true;

        } catch (error) {
            console.error('❌ Git 커밋 실패:', error);
            return false;
        }
    }

    /**
     * 위반사항 리포트 생성
     */
    generateViolationReport(violations) {
        console.log('\n📋 Clean Code 위반사항 리포트');
        console.log('=====================================');

        violations.forEach(violation => {
            console.log(`\n📁 파일: ${violation.file}`);
            violation.issues.forEach(issue => {
                const status = issue.canAutoFix ? '🔧 자동수정' : '⚠️ 수동수정';
                console.log(`  ${status} ${issue.rule}: ${issue.count}개`);
            });
        });

        console.log('\n💡 수동 수정이 필요한 항목들은 개발자가 직접 수정해주세요.');
        console.log('📚 클린 코드 가이드: https://github.com/your-repo/clean-code-guide');
    }

    /**
     * 워처 시작
     */
    start() {
        console.log('🚀 MUMULAB Clean Code Watcher 시작');

        // 초기 스캔
        this.watchFiles();

        // 주기적 스캔 (5분마다)
        setInterval(() => {
            this.watchFiles();
        }, 5 * 60 * 1000);

        console.log('👀 파일 변경 감시 중... (5분 주기)');
    }
}

// 워처 인스턴스 생성 및 시작
const cleanCodeWatcher = new CleanCodeWatcher();

// 브라우저 환경에서 수동 실행 가능
if (typeof window !== 'undefined') {
    window.CleanCodeWatcher = CleanCodeWatcher;
    window.cleanCodeWatcher = cleanCodeWatcher;

    // 개발자 도구에서 수동 실행 가능
    console.log('🔧 Clean Code Watcher 로드됨');
    console.log('수동 실행: cleanCodeWatcher.watchFiles()');
} else {
    // Node.js 환경에서 자동 시작
    cleanCodeWatcher.start();
}

module.exports = CleanCodeWatcher;