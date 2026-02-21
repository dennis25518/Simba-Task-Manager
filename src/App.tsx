import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Communication from "./pages/Communication";
import Profile from "./pages/Profile";
import "./App.css";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Auth />
        }
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
      />
      <Route
        path="/projects"
        element={isAuthenticated ? <Projects /> : <Navigate to="/" replace />}
      />
      <Route
        path="/tasks"
        element={isAuthenticated ? <Tasks /> : <Navigate to="/" replace />}
      />
      <Route
        path="/team"
        element={isAuthenticated ? <Team /> : <Navigate to="/" replace />}
      />
      <Route
        path="/settings"
        element={isAuthenticated ? <Settings /> : <Navigate to="/" replace />}
      />
      <Route
        path="/calendar"
        element={
          isAuthenticated ? <Communication /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
