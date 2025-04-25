import { createContext, useContext, useReducer, ReactNode } from 'react';
import axiosInstance from '../components/axiosInstance';

// Define types for state
type AuthState = {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
};

type AuthAction =
  | { type: 'LOGIN'; token: string; role: string }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  token: null,
  role: null,
  isAuthenticated: false,
};

// Reducer function to handle actions
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          token: action.token,
          role: action.role,
          isAuthenticated: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          token: null,
          role: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  };

// Create context
const AuthContext = createContext<any>(null);

// AuthProvider component to provide context to the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
  
    const login = async (email: string, password: string) => {
      try {
        const response = await axiosInstance.post('auth/login', { email, password });
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        dispatch({ type: 'LOGIN', token, role });
      } catch (error) {
        console.error('Login failed', error);
      }
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      dispatch({ type: 'LOGOUT' });
    };
  
    const setAuthState = (token: string, role: string) => {
      dispatch({ type: 'LOGIN', token, role });
    };
  
    return (
      <AuthContext.Provider value={{ state, login, logout, setAuthState }}>
        {children}
      </AuthContext.Provider>
    );
  };
// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
