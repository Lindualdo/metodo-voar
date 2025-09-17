// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

// Audio types
export interface AudioRecord {
  id: string;
  userId: string;
  date: string;
  time: string;
  duration: number; // em segundos
  transcript: string;
  emotions: EmotionTag[];
  categories: CategoryTag[];
  status: 'processado' | 'processando' | 'erro';
  createdAt: string;
}

export interface EmotionTag {
  emotion: 'satisfeito' | 'ansioso' | 'frustrado' | 'motivado' | 'neutro';
  confidence: number; // 0-1
}

export interface CategoryTag {
  category: 'autoconhecimento' | 'disciplina' | 'treino-mental' | 'foco-execucao' | 'evolucao-continua';
  confidence: number; // 0-1
}

// Dashboard types
export interface DashboardStats {
  registros: {
    total: number;
    esteMes: number;
  };
  metas: {
    concluidas: number;
    total: number;
  };
  tempoMedio: {
    minutos: number;
    segundos: number;
  };
  sequencia: {
    diasConsecutivos: number;
  };
}

export interface WeeklyEvolution {
  semana: string;
  pontuacao: number;
}

export interface CategoryDistribution {
  categoria: string;
  quantidade: number;
  cor: string;
}

// Analytics types
export interface EmotionDistribution {
  emocao: 'Satisfeito' | 'Ansioso' | 'Frustrado' | 'Motivado';
  quantidade: number;
  cor: string;
}

export interface Pattern {
  tipo: 'padrao' | 'progresso' | 'recomendacao';
  titulo: string;
  descricao: string;
  icone?: string;
}

// Goals types
export interface Goal {
  id: string;
  titulo: string;
  descricao?: string;
  valorAtual: number;
  valorAlvo: number;
  unidade: string;
  status: 'ativa' | 'concluida' | 'pausada';
  progresso: number; // 0-100
  prazo?: string;
  categoria: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  dataConquista: string;
  tipo: 'streak' | 'meta' | 'insight' | 'consistencia';
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Settings types
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    lembretes: boolean;
  };
  privacy: {
    compartilharAnalises: boolean;
    historicoPublico: boolean;
  };
  audio: {
    qualidade: 'baixa' | 'media' | 'alta';
    autoTranscricao: boolean;
  };
}

// Chart data types
export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  label?: string;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
  disabled?: boolean;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Audio player types
export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
}

export interface AudioPlayerControls {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
}