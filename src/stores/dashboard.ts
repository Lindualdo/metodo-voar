import { create } from 'zustand';
import { 
  DashboardStats, 
  WeeklyEvolution, 
  CategoryDistribution 
} from '@/types';
import { 
  mockDashboardStats, 
  mockWeeklyEvolution, 
  mockCategoryDistribution,
  mockApiCall 
} from '@/lib/mock-data';

interface DashboardState {
  // Data
  stats: DashboardStats | null;
  weeklyEvolution: WeeklyEvolution[];
  categoryDistribution: CategoryDistribution[];
  
  // Loading states
  isLoadingStats: boolean;
  isLoadingCharts: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  fetchDashboardData: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchCharts: () => Promise<void>;
  clearError: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  stats: null,
  weeklyEvolution: [],
  categoryDistribution: [],
  isLoadingStats: false,
  isLoadingCharts: false,
  error: null,

  // Fetch all dashboard data
  fetchDashboardData: async () => {
    try {
      set({ error: null });
      await Promise.all([
        get().fetchStats(),
        get().fetchCharts()
      ]);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao carregar dados'
      });
    }
  },

  // Fetch dashboard stats
  fetchStats: async () => {
    try {
      set({ isLoadingStats: true, error: null });
      
      // Simulate API call
      const stats = await mockApiCall(mockDashboardStats, 800);
      
      set({ 
        stats,
        isLoadingStats: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao carregar estatísticas',
        isLoadingStats: false 
      });
    }
  },

  // Fetch dashboard charts
  fetchCharts: async () => {
    try {
      set({ isLoadingCharts: true, error: null });
      
      // Simulate API calls
      const [weeklyEvolution, categoryDistribution] = await Promise.all([
        mockApiCall(mockWeeklyEvolution, 600),
        mockApiCall(mockCategoryDistribution, 700)
      ]);
      
      set({ 
        weeklyEvolution,
        categoryDistribution,
        isLoadingCharts: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao carregar gráficos',
        isLoadingCharts: false 
      });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));