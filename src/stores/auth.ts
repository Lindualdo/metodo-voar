import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  // User data
  user: User | null;
  isAuthenticated: boolean;

  // Loading states
  isLoading: boolean;
  isInitializing: boolean;

  // Error states
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitializing: (initializing: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  logout: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,

  // Set user and authentication state
  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
      isInitializing: false,
      error: null
    });
  },

  // Set loading state
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  // Set initializing state
  setInitializing: (initializing: boolean) => {
    set({ isInitializing: initializing });
  },

  // Set error state
  setError: (error: string | null) => {
    set({ error });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },

  // Logout user
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  },

  // Reset all state
  reset: () => {
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitializing: true,
      error: null
    });
  },
}));