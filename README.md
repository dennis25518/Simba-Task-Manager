# Simba Task Manager

A professional task management application built with React, TypeScript, and Tailwind CSS to help you track your projects and boost productivity.

## Features

✨ **Authentication**

- Secure login and registration pages
- Mock authentication (replace with your backend)
- User profile management with avatar

📊 **Dashboard**

- Welcome section with personalized greeting
- Quick stat cards (All Tasks, Pending, Completed, Team Members)
- Task grid layout (2x3 columns)
- Productivity insights with circular pie chart
- Upcoming tasks tracking

📋 **Task Management**

- Create new tasks with title, description, and priority
- View tasks with status indicators (Pending, In Progress, Completed)
- Delete tasks easily
- Filter tasks by status and priority
- Edit task details

🎯 **Sidebar Navigation**

- Collapsible sidebar for better space management
- Quick navigation between Dashboard, Projects, Tasks, Calendar, Team, and Settings
- User account section with logout functionality
- Responsive design for mobile and desktop

📱 **Design**

- Modern, professional UI with Tailwind CSS
- Responsive grid layouts
- Smooth animations and transitions
- Color-coded status indicators
- React Icons for consistent iconography

## Tech Stack

- **Frontend**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Charts**: Recharts
- **State Management**: React Context API

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── StatCard.tsx    # Statistics cards
│   ├── TaskCard.tsx    # Individual task card
│   └── ProductivityChart.tsx  # Pie chart for task stats
├── context/            # Context providers
│   ├── AuthContext.tsx # Authentication context
│   └── TaskContext.tsx # Task management context
├── hooks/              # Custom hooks
│   ├── useAuth.ts      # Auth hook
│   └── useTask.ts      # Task hook
├── pages/              # Page components
│   ├── Auth.tsx        # Login/Register page
│   └── Dashboard.tsx   # Main dashboard
├── types/              # TypeScript type definitions
│   └── index.ts        # App types
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point
└── index.css           # Global styles with Tailwind
```

## Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173/`

## Getting Started

### Demo Credentials

The authentication is mocked, so you can use **any email and password** (minimum 6 characters):

- Email: `test@example.com`
- Password: `password123`

### Creating Tasks

1. Click the "New Task" button on the dashboard
2. Enter task title, description, and priority
3. Click "Add Task" to create it
4. View all your tasks in the grid below

### Task Status

- **Pending** (Red): Not started yet
- **In Progress** (Yellow): Currently being worked on
- **Completed** (Green): Done!

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Customization

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `App.tsx`
4. Use the existing Context providers or create new ones

### Backend Integration

Replace the mock authentication in `src/context/AuthContext.tsx` with real API calls:

```typescript
const login = async (email: string, password: string) => {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const user = await response.json();
  setUser(user);
};
```

### Theme Customization

Update colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: "#your-color",
      secondary: "#your-color",
      // ...
    },
  },
},
```

## Future Enhancements

- 📅 Calendar view for tasks
- 👥 Team collaboration features
- 📈 Advanced analytics and charts
- 🔔 Notifications and reminders
- 💾 Local storage persistence
- 🌙 Dark mode support
- 📱 Mobile app version

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.

---

Built with ❤️ for the Simba Express startup team
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
