# Claude.md - AI Assistant Configuration for MUMULAB

## Project Context

You are an AI assistant helping to build MUMULAB, an end-to-end business builder platform inspired by Linear.app's design system. This platform guides entrepreneurs through the complete journey of building a business, from ideation to scaling operations.

## Design Philosophy

### Core Principles
1. **Minimalist Design**: Clean, uncluttered interfaces with purposeful white space
2. **Linear.app Aesthetics**: Match Linear's purple-based color scheme, typography, and component patterns
3. **Functional Beauty**: Every design element should serve a purpose
4. **Smooth Interactions**: Subtle animations and micro-interactions enhance user experience
5. **Information Hierarchy**: Clear visual hierarchy guides users through complex information

### Visual Language
- **Primary Color**: #7c3aed (Purple/Violet from Linear)
- **Typography**: System font stack with clean, modern appearance
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle, multi-layered shadows for depth
- **Borders**: Light borders (#e4e4e7) with focus states in primary color
- **Radius**: Small to medium border radius (4px-8px)

## Technical Standards

### Code Quality
```typescript
// Always use TypeScript with strict type checking
// Prefer functional components with hooks
// Use proper error boundaries
// Implement loading and error states
// Follow React best practices and patterns
```

### Component Architecture
- Build reusable, composable components
- Use compound component patterns for complex UI
- Implement proper prop typing with TypeScript
- Create accessible components following WCAG 2.1 AA standards
- Use semantic HTML elements

### Performance Guidelines
- Lazy load components and routes
- Optimize images with Next.js Image component
- Implement proper code splitting
- Use React.memo and useMemo appropriately
- Minimize bundle size with tree shaking

## Navigation Structure

### Main Navigation Hierarchy
```
MUMULAB
├── 아이디어 & 검증
│   ├── 아이디어 수집
│   ├── 시장 조사
│   ├── 경쟁사 분석
│   └── 아이디어 검증
├── 계획 & 전략
│   ├── 비즈니스 모델
│   ├── 재무 계획
│   ├── 리소스 계획
│   └── 타임라인
├── 개발 & 구축
│   ├── 제품 로드맵
│   ├── MVP 계획
│   ├── 개발 추적
│   └── 테스팅
├── 출시 & 성장
│   ├── GTM 전략
│   ├── 마케팅 계획
│   ├── 분석 대시보드
│   └── 성장 추적
└── 운영 & 확장
    ├── 프로세스 문서화
    ├── 팀 관리
    ├── 성과 지표
    └── 확장 전략
```

## Implementation Patterns

### Layout Pattern
```tsx
// Standard page layout structure
<Layout>
  <Header />
  <Navigation />
  <main className="flex-1">
    <Container>
      <PageHeader title="" description="" />
      <Content />
    </Container>
  </main>
  <Footer />
</Layout>
```

### Component Naming Convention
- Components: PascalCase (e.g., `NavigationMenu`)
- Utilities: camelCase (e.g., `formatDate`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_ITEMS`)
- Types/Interfaces: PascalCase with descriptive suffixes (e.g., `NavigationItemProps`)

### File Organization
- Group related components in feature folders
- Keep components close to where they're used
- Separate business logic from presentation
- Use barrel exports for cleaner imports

## State Management Patterns

### Local State
- Use useState for component-specific state
- Use useReducer for complex state logic
- Keep state as close to where it's needed as possible

### Global State (Zustand)
```typescript
// Store structure
const useStore = create((set) => ({
  // State
  navigation: { isOpen: false },
  
  // Actions
  toggleNavigation: () => set((state) => ({
    navigation: { isOpen: !state.navigation.isOpen }
  })),
}));
```

## API Integration Patterns

### Data Fetching
```typescript
// Use Next.js App Router patterns
// Server Components for initial data
// Client Components for interactivity
// Implement proper loading/error states
// Use SWR or React Query for client-side fetching
```

### Error Handling
```typescript
// Consistent error handling pattern
try {
  // Operation
} catch (error) {
  // Log to monitoring service
  // Show user-friendly error message
  // Provide recovery options
}
```

## Styling Guidelines

### Tailwind CSS Usage
```tsx
// Prefer Tailwind utility classes
// Use design tokens for consistency
// Create component variants with cva()
// Avoid arbitrary values when possible

// Example component with variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-input hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
  }
);
```

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- Proper heading hierarchy (h1 → h6)
- Sufficient color contrast (4.5:1 for normal text)
- Keyboard navigation support
- ARIA labels for interactive elements
- Focus indicators for all interactive elements
- Screen reader compatibility

### Keyboard Navigation
```typescript
// Implement keyboard shortcuts
// Tab navigation through all interactive elements
// Escape to close modals/dropdowns
// Enter/Space to activate buttons
// Arrow keys for menu navigation
```

## Testing Approach

### Component Testing
```typescript
// Test user interactions
// Test accessibility
// Test edge cases
// Test loading/error states
// Mock external dependencies
```

### Integration Testing
```typescript
// Test user flows
// Test navigation
// Test form submissions
// Test data persistence
```

## Documentation Standards

### Code Documentation
```typescript
/**
 * Component description
 * @param props - Component props
 * @returns JSX.Element
 * @example
 * <ComponentName prop="value" />
 */
```

### README Structure
1. Project Overview
2. Quick Start
3. Architecture
4. Development
5. Testing
6. Deployment
7. Contributing

## Common Patterns & Solutions

### Loading States
```tsx
if (loading) return <Skeleton />;
if (error) return <ErrorMessage />;
return <Content data={data} />;
```

### Form Handling
```tsx
// Use react-hook-form with zod validation
// Implement proper error messages
// Show loading state during submission
// Provide success feedback
```

### Modal/Dialog Pattern
```tsx
// Use Radix UI Dialog primitive
// Implement focus trap
// Handle escape key
// Prevent body scroll
// Animate entry/exit
```

## Performance Optimization

### Image Optimization
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### Code Splitting
```tsx
const Component = dynamic(() => import('./Component'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

## Security Best Practices

1. Sanitize user inputs
2. Implement CSP headers
3. Use environment variables for secrets
4. Validate data on both client and server
5. Implement rate limiting (future)
6. Use HTTPS everywhere

## Deployment Checklist

- [ ] Build passes without errors
- [ ] All tests pass
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] Responsive on all breakpoints
- [ ] Browser compatibility verified
- [ ] Environment variables configured
- [ ] Error tracking configured
- [ ] Analytics implemented
- [ ] SEO meta tags present

## AI Assistant Behavior

When implementing features for MUMULAB:

1. **Always follow the Linear.app design language**
2. **Prioritize user experience and accessibility**
3. **Write clean, maintainable, typed code**
4. **Implement proper error handling**
5. **Add loading and empty states**
6. **Ensure responsive design**
7. **Follow the established patterns**
8. **Comment complex logic**
9. **Optimize for performance**
10. **Test accessibility features**

## Response Format

When providing code:
1. Use TypeScript for all code
2. Include necessary imports
3. Add proper types/interfaces
4. Follow the project structure
5. Use consistent formatting
6. Include error handling
7. Add comments for clarity
8. Suggest tests when appropriate

## Example Interactions

### Creating a New Component
"Create a navigation component" → Implement with:
- Linear.app styling
- Hover dropdown menus
- TypeScript types
- Accessibility features
- Responsive design
- Smooth animations

### Adding a Feature
"Add search functionality" → Include:
- Debounced input
- Loading states
- Error handling
- Keyboard shortcuts
- Accessibility
- Performance optimization

Remember: The goal is to create a professional, polished platform that matches Linear.app's quality while serving the unique needs of business builders.