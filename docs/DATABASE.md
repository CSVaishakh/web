# Data Documentation

This document outlines the Data structure, schema design, and data management practices for the TaskStream application.

## Table of Contents

- [Data Overview](#Data-overview)
- [Schema Design](#schema-design)
- [User Management](#user-management)
- [Authentication & Authorization](#authentication--authorization)
- [Data Types & Constraints](#data-types--constraints)
- [API Integration](#api-integration)
- [Security Considerations](#security-considerations)
- [Migration Guidelines](#migration-guidelines)
- [Backup & Recovery](#backup--recovery)

## Data Overview

TaskStream uses a RESTful API backend to manage data persistence. The frontend application communicates with the Data through well-defined API endpoints, ensuring a clean separation between the presentation layer and data layer.

### Architecture
```
Frontend (Next.js/React) ↔ API Layer ↔ Data
```

### Data Flow
1. **User Interactions**: Frontend captures user input
2. **API Requests**: Axios client sends HTTP requests
3. **Data Processing**: Backend API handles business logic
4. **Data Operations**: CRUD operations performed
5. **Response**: Data returned to frontend for display

## Schema Design

Based on the codebase analysis, the primary data entities include:

### User Entity
```typescript
interface User {
  userid: string;      // Primary identifier
  email: string;       // Unique email address
  name: string;        // User's display name
  role: string;        // User role/permissions
  created_at: string;  // Account creation timestamp
}
```

### Authentication Entity
```typescript
interface Credentials {
  Email: string;       // Login email
  Password: string;    // Hashed password
  Role_code: string;   // Role assignment code
  Name: string;        // User's full name
}
```

### Profile Entity
```typescript
interface Profile {
  userid: string;      // Foreign key to User
  email: string;       // User email
  name: string;        // Display name
  role: string;        // Current role
  created_at: string;  // Profile creation date
}
```

## User Management

### User Registration Flow
1. **Client Side**: User fills registration form
2. **Validation**: Frontend validates input format
3. **API Call**: POST request to `/auth/register`
4. **Server Processing**: 
   - Validate unique email
   - Hash password
   - Assign role based on role_code
   - Create user record
5. **Response**: Return user data and JWT token

### User Authentication Flow
1. **Login Request**: POST to `/auth/login` with credentials
2. **Verification**: Server validates email/password
3. **Token Generation**: JWT token created with user claims
4. **Client Storage**: Token stored in localStorage via Zustand
5. **Session Management**: Token used for subsequent API calls

### Profile Management
- **Read Profile**: GET `/profile/:userid`
- **Update Profile**: PUT `/profile/:userid`
- **Delete Profile**: DELETE `/profile/:userid`

## Authentication & Authorization

### Token-Based Authentication
The application uses JWT (JSON Web Tokens) for stateless authentication:

```typescript
// Token structure (example)
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "user",
  "iat": 1640995200,
  "exp": 1641081600
}
```

### Role-Based Access Control (RBAC)
```typescript
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

// Role permissions matrix
const ROLE_PERMISSIONS = {
  admin: ['create', 'read', 'update', 'delete', 'manage_users'],
  moderator: ['create', 'read', 'update', 'moderate_content'],
  user: ['create', 'read', 'update_own']
};
```

### Protected Routes Implementation
```typescript
// Frontend route protection
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, user } = useAuthStore();
  
  if (!token || !user) {
    redirect('/auth/login');
    return null;
  }
  
  return <>{children}</>;
};
```

## Data Types & Constraints

### Field Specifications

#### User Table
```sql
-- Hypothetical SQL schema
CREATE TABLE users (
  userid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);
```

#### Constraints & Validations
- **Email**: Must be valid email format, unique across system
- **Password**: Minimum 8 characters, hashed using bcrypt
- **Name**: 1-100 characters, required field
- **Role**: Must be one of predefined roles
- **User ID**: UUID format for security and uniqueness

### Data Validation Layers

#### Frontend Validation
```typescript
import { z } from 'zod';

const UserRegistrationSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  role_code: z.string().optional()
});
```

#### Backend Validation
- Input sanitization to prevent SQL injection
- Data type validation
- Business rule enforcement
- Duplicate prevention

## API Integration

### Authentication Endpoints
```typescript
// Registration
POST /api/auth/register
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "role_code": "USER_CODE"
}

// Login
POST /api/auth/login
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "securepassword"
}

// Response format
{
  "success": true,
  "data": {
    "user": {
      "userid": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "token": "jwt.token.here"
  }
}
```

### Profile Endpoints
```typescript
// Get profile
GET /api/profile/:userid
Authorization: Bearer <jwt_token>

// Update profile
PUT /api/profile/:userid
Authorization: Bearer <jwt_token>
Content-Type: application/json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

### Error Responses
```typescript
// Standard error format
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email already exists",
    "details": {
      "field": "email",
      "value": "user@example.com"
    }
  }
}
```

## Security Considerations

### Data Protection
1. **Password Security**
   - Passwords hashed using bcrypt with salt
   - Never store plain text passwords
   - Enforce strong password policies

2. **SQL Injection Prevention**
   - Use parameterized queries
   - Input validation and sanitization
   - ORM/query builder usage

3. **Token Security**
   - JWT tokens with expiration
   - Secure storage in httpOnly cookies (recommended)
   - Token refresh mechanism

4. **Data Encryption**
   - Encrypt sensitive data at rest
   - Use HTTPS for data in transit
   - Environment-specific encryption keys

### Access Control
```typescript
// Middleware for route protection
const requireAuth = (requiredRole?: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
```

### Data Privacy
- **GDPR Compliance**: Right to data deletion
- **Data Minimization**: Collect only necessary data
- **Audit Logging**: Track data access and modifications
- **Retention Policies**: Automatic data cleanup

## Migration Guidelines

### Data Versioning
```typescript
// Migration file structure
migrations/
├── 001_create_users_table.sql
├── 002_add_user_roles.sql
├── 003_create_profiles_table.sql
└── 004_add_user_indexes.sql
```

### Migration Best Practices
1. **Backward Compatibility**: Ensure migrations don't break existing data
2. **Rollback Strategy**: Every migration should have a rollback script
3. **Testing**: Test migrations on staging before production
4. **Incremental Changes**: Small, focused migrations over large changes

### Example Migration
```sql
-- 001_create_users_table.sql
-- Up migration
CREATE TABLE users (
  userid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Down migration (rollback)
DROP TABLE IF EXISTS users;
```

## Backup & Recovery

### Backup Strategy
1. **Automated Daily Backups**
   - Full Data backup daily
   - Incremental backups every 6 hours
   - Retention period: 30 days

2. **Point-in-Time Recovery**
   - Transaction log backups
   - Ability to restore to any point in last 30 days

3. **Cross-Region Replication**
   - Real-time replication to secondary region
   - Automatic failover capability

### Disaster Recovery Plan
1. **RTO (Recovery Time Objective)**: 4 hours
2. **RPO (Recovery Point Objective)**: 1 hour
3. **Backup Testing**: Monthly restoration tests
4. **Documentation**: Detailed recovery procedures

### Monitoring & Maintenance
```typescript
// Health check endpoint
GET /api/health
{
  "status": "healthy",
  "Data": {
    "connected": true,
    "latency": "5ms",
    "pool": {
      "active": 5,
      "idle": 10,
      "max": 20
    }
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Performance Optimization

### Data Optimization
1. **Indexing Strategy**
   - Primary keys on all tables
   - Indexes on frequently queried columns
   - Composite indexes for multi-column queries

2. **Query Optimization**
   - Use EXPLAIN to analyze query performance
   - Avoid N+1 query problems
   - Implement query result caching

3. **Connection Pooling**
   - Optimize connection pool size
   - Monitor connection usage
   - Implement connection timeout handling

### Frontend Optimization
```typescript
// API response caching
const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get<User[]>('/users'),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Optimistic updates
const updateUserMutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries(['users']);
    const previousUsers = queryClient.getQueryData(['users']);
    queryClient.setQueryData(['users'], old => [...old, newUser]);
    return { previousUsers };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['users'], context.previousUsers);
  },
  onSettled: () => {
    queryClient.invalidateQueries(['users']);
  },
});
```

## Development Workflow

### Local Development
1. **Data Setup**: Use Docker for consistent local environment
2. **Seed Data**: Scripts to populate development Data
3. **API Mocking**: Mock API responses during development
4. **Testing**: Unit and integration tests for Data operations

### Environment Management
```typescript
// Environment-specific configurations
const config = {
  development: {
    Data: {
      host: 'localhost',
      port: 5432,
      name: 'taskstream_dev',
    },
    api: {
      baseUrl: 'http://localhost:3001/api',
    },
  },
  staging: {
    Data: {
      host: 'staging-db.example.com',
      port: 5432,
      name: 'taskstream_staging',
    },
    api: {
      baseUrl: 'https://staging-api.taskstream.com/api',
    },
  },
  production: {
    Data: {
      host: process.env.Data_HOST,
      port: parseInt(process.env.Data_PORT),
      name: process.env.Data_NAME,
    },
    api: {
      baseUrl: process.env.API_BASE_URL,
    },
  },
};
```

This documentation provides a comprehensive overview of the Data structure and data management practices for the TaskStream application. As the application evolves, this documentation should be updated to reflect any changes in the Data schema or data handling procedures.
