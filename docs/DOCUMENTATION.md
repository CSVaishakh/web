# TaskStream Web Application Documentation

## Overview

TaskStream is a modern web application built with Next.js 15, React 19, and TypeScript. It features a robust authentication system, protected routes, and a clean, responsive UI built with Tailwind CSS and Radix UI components.

## Architecture

### Frontend Stack
- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Lucide React icons
- **State Management**: Zustand with persistence
- **HTTP Client**: Axios
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

### Project Structure

```
web/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   └── dashboard/         # Dashboard routes
│       ├── page.tsx       # Dashboard main page
│       └── profile/       # Profile sub-routes
├── components/            # Reusable React components
│   ├── protectedRoute.tsx # Route protection wrapper
│   ├── signOut.tsx        # Sign out component
│   └── home/              # Home page components
├── store/                 # Zustand state management
│   └── auth.ts            # Authentication store
├── types/                 # TypeScript type definitions
│   └── types.ts           # Shared interfaces and types
├── public/                # Static assets
└── docs/                  # Project documentation
```

## Features

### Authentication System
- User registration and login
- Role-based access control
- Persistent authentication state using Zustand
- Protected routes with automatic redirection
- Secure token management

### State Management
- **Zustand Store**: Lightweight state management
- **Persistence**: Authentication state persisted across sessions
- **DevTools**: Development debugging support

### UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Radix UI for accessible components
- **Icons**: Lucide React for consistent iconography
- **Animations**: Custom animations with tw-animate-css

## Key Components

### Authentication Store (`store/auth.ts`)
Manages user authentication state with the following methods:
- `setToken(token: string)`: Store authentication token
- `setUser(user: string)`: Store user information
- `clearToken()`: Remove authentication token
- `logout()`: Clear all authentication data

### Protected Route (`components/protectedRoute.tsx`)
Wrapper component that:
- Checks authentication status
- Redirects unauthenticated users
- Provides route-level access control

### Type Definitions (`types/types.ts`)
- `Credentials`: User login/registration data structure
- `AuthState`: Authentication store state interface
- `Profile`: User profile information structure

## Development Workflow

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open http://localhost:3000

### Build Process
- **Development**: `npm run dev` (with Turbopack for fast builds)
- **Production Build**: `npm run build`
- **Production Start**: `npm start`
- **Linting**: `npm run lint`

### Code Quality
- **ESLint**: Enforces code style and catches errors
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Runs linters on staged files

## API Integration

The application integrates with external APIs using Axios for:
- User authentication
- Profile management
- Data fetching and manipulation

## Security Considerations

- Authentication tokens stored securely
- Protected routes prevent unauthorized access
- Type safety with TypeScript
- Input validation and sanitization

## Performance Optimizations

- **Next.js 15**: Latest performance improvements
- **Turbopack**: Fast development builds
- **Lazy Loading**: Components loaded on demand
- **Font Optimization**: Geist font family optimization

## Browser Support

- Modern browsers supporting ES2020+
- Mobile-responsive design
- Progressive enhancement approach

## Deployment

The application is designed for deployment on:
- **Vercel** (recommended for Next.js apps)
- **Netlify**
- **Traditional hosting** with Node.js support

For detailed deployment instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
