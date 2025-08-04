# Contributing to TaskStream

Thank you for considering contributing to TaskStream! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Code Review Process](#code-review-process)

## Getting Started

### Prerequisites

- **Node.js**: Version 18.17 or higher
- **npm**: Version 9 or higher (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code recommended with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

### Development Setup

1. **Fork the Repository**
   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/web-OMP.git
   cd web-OMP
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   ```bash
   # Copy environment template (if exists)
   cp .env.example .env.local
   # Configure your local environment variables
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Verify Setup**
   - Open http://localhost:3000
   - Verify all features work correctly
   - Run tests: `npm run lint`

## Contribution Workflow

### 1. Create a Feature Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Follow the [Code Style Guidelines](#code-style-guidelines)
- Write clear, concise code
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes
```bash
# Run linting
npm run lint

# Run type checking
npx tsc --noEmit

# Test the application thoroughly
npm run dev
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
# Create PR on GitHub
```

## Code Style Guidelines

### TypeScript/JavaScript

- **Use TypeScript**: All new code should be written in TypeScript
- **Strict Type Safety**: Avoid `any` types, use proper interfaces
- **Functional Components**: Use React functional components with hooks
- **Named Exports**: Prefer named exports over default exports (except for pages)

```typescript
// ✅ Good
export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return <div>{user.name}</div>;
};

// ❌ Avoid
export default function UserProfile(props: any) {
  return <div>{props.user.name}</div>;
}
```

### React Best Practices

- **Component Structure**: Keep components small and focused
- **Hooks**: Use custom hooks for reusable logic
- **State Management**: Use Zustand for global state, local state for component-specific data
- **Props Validation**: Define proper TypeScript interfaces for props

### Styling Guidelines

- **Tailwind CSS**: Use Tailwind utilities for styling
- **Responsive Design**: Mobile-first approach
- **Consistent Spacing**: Use Tailwind's spacing scale
- **Dark Mode**: Consider dark mode compatibility

```typescript
// ✅ Good - Responsive and semantic
<div className="flex flex-col space-y-4 p-4 md:flex-row md:space-x-6 md:space-y-0">
  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded">
    Submit
  </button>
</div>

// ❌ Avoid - Inline styles and poor responsive design
<div style={{ display: 'flex', padding: '16px' }}>
  <button style={{ backgroundColor: 'blue' }}>Submit</button>
</div>
```

### File Organization

- **Naming**: Use kebab-case for files, PascalCase for components
- **Structure**: Group related components in folders
- **Imports**: Organize imports (external libraries first, then internal)
- **Barrel Exports**: Use index files for clean imports

```typescript
// ✅ Good import organization
import React from 'react';
import { NextPage } from 'next';
import { Button } from '@radix-ui/react-button';

import { useAuthStore } from '@/store/auth';
import { UserProfile } from '@/components/user-profile';
import { type User } from '@/types/types';
```

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```bash
feat(auth): add social login integration
fix(dashboard): resolve profile data loading issue
docs(readme): update installation instructions
style(components): format code with prettier
refactor(store): simplify auth state management
```

## Pull Request Process

### Before Submitting

1. **Update Documentation**: Ensure docs reflect your changes
2. **Run All Checks**: Lint, type-check, and test thoroughly
3. **Rebase on Main**: Ensure your branch is up-to-date
4. **Self-Review**: Review your own code before submission

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes and motivation

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All existing tests pass
- [ ] Added new tests (if applicable)

## Screenshots
(If applicable, add screenshots to demonstrate changes)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors or warnings
```

### Review Criteria

PRs will be reviewed for:
- **Code Quality**: Readability, maintainability, performance
- **Testing**: Adequate test coverage
- **Documentation**: Clear documentation of changes
- **Security**: No security vulnerabilities introduced
- **Compatibility**: Works across supported browsers/devices

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should have happened

## Actual Behavior
What actually happened

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 22]

## Additional Context
Any other context about the problem
```

### Feature Requests

```markdown
## Feature Description
Clear description of the proposed feature

## Problem/Use Case
What problem does this solve?

## Proposed Solution
How should this be implemented?

## Alternatives Considered
Any alternative solutions considered?

## Additional Context
Any other context or screenshots
```

## Code Review Process

### For Reviewers

- **Be Constructive**: Provide helpful feedback
- **Ask Questions**: If something is unclear, ask for clarification
- **Suggest Improvements**: Offer specific suggestions
- **Approve Responsibly**: Only approve if you'd be comfortable maintaining the code

### For Contributors

- **Be Responsive**: Address feedback promptly
- **Be Open**: Consider all feedback objectively
- **Ask for Clarification**: If feedback is unclear, ask questions
- **Learn**: Use reviews as learning opportunities

## Development Tools

### Recommended VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**
- **GitLens**
- **Thunder Client** (for API testing)

### Useful Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors

# Git hooks (handled by Husky)
npm run prepare      # Set up git hooks
```

## Getting Help

- **Documentation**: Check existing docs first
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Tag maintainers for urgent reviews

## Recognition

Contributors will be recognized in:
- **README.md**: Contributors section
- **CHANGELOG.md**: Release notes
- **GitHub**: Contributor graphs and statistics

Thank you for contributing to TaskStream! 🚀
