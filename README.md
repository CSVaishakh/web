# TaskStream

A modern, feature-rich task management web application built with Next.js 15, React 19, and TypeScript. TaskStream provides a seamless user experience with robust authentication, protected routes, and a clean, responsive interface.

![TaskStream Logo](./public/TaskStream.svg)

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based authentication with role-based access control
- 🛡️ **Protected Routes**: Automatic redirection for unauthorized access
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI**: Built with Radix UI components and Lucide React icons
- ⚡ **Fast Development**: Turbopack integration for lightning-fast builds
- 🔄 **State Management**: Zustand with persistence for reliable state handling
- 🎯 **Type Safety**: Full TypeScript coverage with strict type checking
- 🧹 **Code Quality**: ESLint, Prettier, and Husky for consistent code standards

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 18.17 or higher
- **npm**: Version 9 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CSVaishakh/web-OMP.git
   cd web-OMP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - Latest React version with new features
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework

### UI & Components
- **[Radix UI](https://www.radix-ui.com)** - Accessible component primitives
- **[Lucide React](https://lucide.dev)** - Beautiful & consistent icons
- **[Class Variance Authority](https://cva.style/docs)** - Component variants
- **[Tailwind Merge](https://www.npmjs.com/package/tailwind-merge)** - Conditional styling

### State & Data
- **[Zustand](https://zustand-demo.pmnd.rs)** - Lightweight state management
- **[Axios](https://axios-http.com)** - HTTP client for API requests

### Development Tools
- **[ESLint](https://eslint.org)** - Code linting and error detection
- **[Prettier](https://prettier.io)** - Code formatting
- **[Husky](https://typicode.github.io/husky)** - Git hooks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Run linters on staged files

## 📁 Project Structure

```
web/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── dashboard/         # Dashboard routes
├── components/            # React components
│   ├── protectedRoute.tsx # Route protection
│   ├── signOut.tsx        # Authentication
│   └── home/              # Feature components
├── store/                 # Zustand stores
│   └── auth.ts           # Authentication state
├── types/                 # TypeScript definitions
│   └── types.ts          # Shared interfaces
├── public/               # Static assets
└── docs/                 # Documentation
```

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[📖 Documentation](./docs/DOCUMENTATION.md)** - Complete project overview and architecture
- **[🤝 Contributing](./docs/CONTRIBUTING.md)** - Contribution guidelines and development workflow
- **[📋 Conventions](./docs/CONVENTIONS.md)** - Coding standards and best practices
- **[🗄️ Data](./docs/Data.md)** - Data schema and data management

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run prepare      # Set up Git hooks with Husky
```

## 🔧 Development Workflow

### Code Quality
This project maintains high code quality through:

- **Pre-commit hooks**: Automatic linting and formatting
- **Type checking**: Strict TypeScript configuration
- **Consistent formatting**: Prettier configuration
- **Code linting**: ESLint with Next.js rules

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: describe your changes"

# Push and create PR
git push origin feature/your-feature-name
```

## 🌟 Key Features Deep Dive

### Authentication System
- **JWT Tokens**: Secure token-based authentication
- **Persistent State**: Login state preserved across sessions
- **Role-based Access**: Different access levels for users
- **Protected Routes**: Automatic redirect for unauthorized users

### State Management
- **Zustand Store**: Lightweight and performant
- **Persistence**: State survives page refreshes
- **DevTools**: Development debugging support
- **Type Safety**: Full TypeScript integration

### Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **Tailwind CSS**: Utility-first styling approach
- **Consistent Design**: Design system with reusable components
- **Accessibility**: WCAG compliant components

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for details on:

- Development setup
- Coding standards
- Pull request process
- Issue reporting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [docs](./docs/) directory
- **Issues**: [GitHub Issues](https://github.com/CSVaishakh/web-OMP/issues)
- **Discussions**: [GitHub Discussions](https://github.com/CSVaishakh/web-OMP/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the amazing React framework
- [Vercel](https://vercel.com) for hosting and deployment platform
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com) for accessible component primitives

---

Built with ❤️ by [CSVaishakh](https://github.com/CSVaishakh)
