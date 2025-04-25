import './App.css';
import Login from './components/authModule/Login';
import Register from './components/authModule/Register';
import NotesApp from './components/Notes-app';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'react-quill/dist/quill.snow.css'
import { NotesProvider } from './context/NotesContext';

function App() {
  return (
    <AuthProvider>
<NotesProvider>
<MainApp />
</NotesProvider>

    </AuthProvider>
  );
}

function MainApp() {
  const { state, logout, setAuthState } = useAuth();

  // Only check for token once during initial load to avoid the infinite loop
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      // Set the auth state if token exists in localStorage (only run once)
      setAuthState(token, role);
    }
  }, []);
  console.log('state: ', state);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!state.isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <main className="min-h-screen">
      <Router>
        <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <NotesApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </main>
  );
}



export default App;
