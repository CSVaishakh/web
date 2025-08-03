# Development Conventions

This document outlines the coding conventions, naming standards, and best practices for the TaskStream project.

## Table of Contents

- [General Principles](#general-principles)
- [TypeScript Conventions](#typescript-conventions)
- [React Conventions](#react-conventions)
- [Next.js Conventions](#next-js-conventions)
- [Styling Conventions](#styling-conventions)
- [File and Folder Structure](#file-and-folder-structure)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Testing Conventions](#testing-conventions)
- [Performance Guidelines](#performance-guidelines)

## General Principles

### Code Quality
- **Readability First**: Write code that tells a story
- **Consistency**: Follow established patterns throughout the codebase
- **Simplicity**: Prefer simple solutions over complex ones
- **Documentation**: Comment complex logic and business rules
- **Type Safety**: Leverage TypeScript's type system fully

### Development Philosophy
- **Component-Driven**: Build reusable, composable components
- **Progressive Enhancement**: Start with basic functionality, add enhancements
- **Accessibility**: Ensure all features are accessible
- **Performance**: Optimize for Core Web Vitals
- **Security**: Follow security best practices

## TypeScript Conventions

### Type Definitions

```typescript
// ✅ Use descriptive interface names
interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

// ✅ Use enums for constants
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

// ✅ Use union types for specific values
type Theme = 'light' | 'dark' | 'system';

// ✅ Use generic types appropriately
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
```

### Naming Conventions

```typescript
// ✅ Interface names: PascalCase
interface UserPreferences {}

// ✅ Type aliases: PascalCase
type ComponentProps = {};

// ✅ Variables and functions: camelCase
const userName = 'john_doe';
const fetchUserData = async () => {};

// ✅ Constants: SCREAMING_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;

// ✅ Component names: PascalCase
const UserDashboard = () => {};
```

### Type Safety Best Practices

```typescript
// ✅ Strict null checks
interface User {
  id: string;
  name: string;
  avatar?: string; // Optional property
}

// ✅ Use type guards
function isValidUser(user: unknown): user is User {
  return (
    typeof user === 'object' &&
    user !== null &&
    'id' in user &&
    'name' in user
  );
}

// ✅ Proper error handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// ✅ Avoid 'any', use proper types
// ❌ const data: any = await fetchData();
// ✅ const data: ApiResponse<User[]> = await fetchUsers();
```

## React Conventions

### Component Structure

```typescript
// ✅ Component file structure
import React from 'react';
import { type ComponentProps } from '@/types';

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  className?: string;
}

export const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  className 
}) => {
  // Hooks at the top
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading } = useUserQuery(user.id);

  // Event handlers
  const handleEdit = useCallback(() => {
    onEdit?.(user);
  }, [onEdit, user]);

  // Early returns
  if (isLoading) {
    return <UserCardSkeleton />;
  }

  // Main render
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <h3>{user.name}</h3>
      {onEdit && (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};
```

### Hooks Conventions

```typescript
// ✅ Custom hooks naming
const useUserData = (userId: string) => {
  // Hook implementation
};

const useLocalStorage = <T>(key: string, defaultValue: T) => {
  // Generic hook implementation
};

// ✅ Proper dependency arrays
useEffect(() => {
  fetchUserData(userId);
}, [userId]); // Include all dependencies

// ✅ Cleanup functions
useEffect(() => {
  const subscription = subscribeToUpdates();
  return () => subscription.unsubscribe();
}, []);
```

### Event Handling

```typescript
// ✅ Type-safe event handlers
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission
};

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};

// ✅ Use useCallback for expensive operations
const handleSearch = useCallback(
  debounce((query: string) => {
    performSearch(query);
  }, 300),
  []
);
```

## Next.js Conventions

### App Router Structure

```
app/
├── layout.tsx           # Root layout
├── page.tsx            # Home page
├── loading.tsx         # Loading UI
├── error.tsx           # Error UI
├── not-found.tsx       # 404 page
├── globals.css         # Global styles
└── (routes)/           # Route groups
    ├── dashboard/
    │   ├── layout.tsx  # Dashboard layout
    │   ├── page.tsx    # Dashboard page
    │   └── settings/
    └── auth/
        ├── login/
        └── register/
```

### Page Components

```typescript
// ✅ Page component structure
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User dashboard for TaskStream',
};

interface DashboardPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function DashboardPage({ 
  params, 
  searchParams 
}: DashboardPageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1>Dashboard</h1>
      {/* Page content */}
    </main>
  );
}
```

### API Routes

```typescript
// ✅ API route structure
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // API logic
    
    return Response.json({ data: result });
  } catch (error) {
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Styling Conventions

### Tailwind CSS

```typescript
// ✅ Responsive design
<div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">

// ✅ Component variations using CVA
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// ✅ Use cn utility for conditional classes
import { cn } from '@/lib/utils';

<button 
  className={cn(
    buttonVariants({ variant, size }),
    className
  )}
>
```

### CSS Custom Properties

```css
/* ✅ Design tokens in globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}
```

## File and Folder Structure

### Naming Conventions

```
components/
├── ui/                 # Basic UI components
│   ├── button.tsx
│   ├── input.tsx
│   └── index.ts       # Barrel exports
├── forms/             # Form components
│   ├── login-form.tsx
│   └── user-form.tsx
├── layout/            # Layout components
│   ├── header.tsx
│   ├── sidebar.tsx
│   └── footer.tsx
└── feature/           # Feature-specific components
    ├── user-profile.tsx
    └── task-list.tsx
```

### File Naming

- **Components**: PascalCase (`UserProfile.tsx`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **Types**: PascalCase (`UserTypes.ts`)

### Import/Export Patterns

```typescript
// ✅ Barrel exports in index.ts
export { Button } from './button';
export { Input } from './input';
export { Card } from './card';

// ✅ Import organization
// External libraries
import React from 'react';
import { NextPage } from 'next';

// Internal utilities
import { cn } from '@/lib/utils';

// Types
import { type User } from '@/types/user';

// Components
import { Button } from '@/components/ui/button';
import { UserCard } from '@/components/user-card';

// ✅ Named exports preferred
export const UserProfile = () => {};

// ✅ Default exports for pages only
export default function HomePage() {}
```

## State Management

### Zustand Store Structure

```typescript
// ✅ Store organization
interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isLoading: boolean;
  
  // Actions
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  
  // Computed values
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        token: null,
        isLoading: false,
        
        // Actions
        login: async (credentials) => {
          set({ isLoading: true });
          try {
            const response = await authApi.login(credentials);
            set({ 
              user: response.user, 
              token: response.token,
              isLoading: false 
            });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        
        logout: () => {
          set({ user: null, token: null });
        },
        
        // Computed values
        get isAuthenticated() {
          return !!get().token;
        },
      }),
      { 
        name: 'auth-storage',
        partialize: (state) => ({ 
          user: state.user, 
          token: state.token 
        }),
      }
    )
  )
);
```

### State Usage Patterns

```typescript
// ✅ Selective subscription
const user = useAuthStore((state) => state.user);
const login = useAuthStore((state) => state.login);

// ✅ Multiple values with shallow comparison
import { shallow } from 'zustand/shallow';

const { user, isLoading } = useAuthStore(
  (state) => ({ user: state.user, isLoading: state.isLoading }),
  shallow
);
```

## API Integration

### API Client Structure

```typescript
// ✅ API client with proper typing
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}
```

### Error Handling

```typescript
// ✅ Consistent error handling
class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiError';
  }
}

// ✅ React Query integration
const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get<User[]>('/users'),
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 404) {
        return false; // Don't retry 404s
      }
      return failureCount < 3;
    },
  });
};
```

## Testing Conventions

### Component Testing

```typescript
// ✅ Test structure
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    expect(onEdit).toHaveBeenCalledWith(mockUser);
  });
});
```

### Test Naming

- **Describe blocks**: Component or function name
- **Test cases**: "should [expected behavior] when [condition]"
- **Mock data**: Prefix with `mock` (`mockUser`, `mockApiResponse`)

## Performance Guidelines

### Component Optimization

```typescript
// ✅ Memo for expensive components
export const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return expensiveDataProcessing(data);
  }, [data]);

  const handleUpdate = useCallback((id: string) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <ItemComponent 
          key={item.id} 
          item={item} 
          onUpdate={handleUpdate} 
        />
      ))}
    </div>
  );
});
```

### Bundle Optimization

```typescript
// ✅ Dynamic imports for large components
const LazyChart = lazy(() => import('./Chart'));

// ✅ Code splitting by route
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// ✅ Conditional imports
const loadAnalytics = async () => {
  if (process.env.NODE_ENV === 'production') {
    const { analytics } = await import('./analytics');
    return analytics;
  }
  return null;
};
```

### Image Optimization

```typescript
// ✅ Next.js Image component
import Image from 'next/image';

<Image
  src="/profile.jpg"
  alt="User profile"
  width={100}
  height={100}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Security Best Practices

### Input Validation

```typescript
// ✅ Input sanitization
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().min(18).max(120),
});

const validateUser = (input: unknown): User => {
  return UserSchema.parse(input);
};
```

### Authentication

```typescript
// ✅ Secure token handling
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth-token');
};

// ✅ Protected API calls
const makeAuthenticatedRequest = async (url: string) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token');
  }

  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
```

These conventions ensure consistency, maintainability, and scalability across the TaskStream project. All team members should follow these guidelines to maintain code quality and developer experience.
