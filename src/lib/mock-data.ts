import { 
  DashboardStats, 
  WeeklyEvolution, 
  CategoryDistribution, 
  AudioRecord, 
  EmotionDistribution, 
  Pattern, 
  Goal, 
  Achievement 
} from '@/types';

// Dashboard mock data
export const mockDashboardStats: DashboardStats = {
  registros: {
    total: 47,
    esteMes: 47
  },
  metas: {
    concluidas: 8,
    total: 12
  },
  tempoMedio: {
    minutos: 2,
    segundos: 15
  },
  sequencia: {
    diasConsecutivos: 15
  }
};

export const mockWeeklyEvolution: WeeklyEvolution[] = [
  { semana: 'S1', pontuacao: 65 },
  { semana: 'S2', pontuacao: 72 },
  { semana: 'S3', pontuacao: 75 },
  { semana: 'S4', pontuacao: 78 }
];

export const mockCategoryDistribution: CategoryDistribution[] = [
  { categoria: 'Autoconhecimento', quantidade: 12, cor: '#6366f1' },
  { categoria: 'Disciplina', quantidade: 8, cor: '#10b981' },
  { categoria: 'Treino Mental', quantidade: 10, cor: '#f59e0b' },
  { categoria: 'Execução e Foco', quantidade: 9, cor: '#ef4444' },
  { categoria: 'Evolução Contínua', quantidade: 8, cor: '#8b5cf6' }
];

// Audio records mock data
export const mockAudioRecords: AudioRecord[] = [
  {
    id: '1',
    userId: 'user-1',
    date: '15/01',
    time: '09:30',
    duration: 150, // 2:30
    transcript: 'Me senti ansioso hoje pela manhã...',
    emotions: [
      { emotion: 'ansioso', confidence: 0.8 }
    ],
    categories: [
      { category: 'autoconhecimento', confidence: 0.9 }
    ],
    status: 'processado',
    createdAt: '2024-01-15T09:30:00Z'
  },
  {
    id: '2',
    userId: 'user-1',
    date: '15/01',
    time: '14:20',
    duration: 105, // 1:45
    transcript: 'Consegui manter a rotina de exercícios...',
    emotions: [
      { emotion: 'satisfeito', confidence: 0.9 }
    ],
    categories: [
      { category: 'disciplina', confidence: 0.85 }
    ],
    status: 'processado',
    createdAt: '2024-01-15T14:20:00Z'
  },
  {
    id: '3',
    userId: 'user-1',
    date: '14/01',
    time: '18:45',
    duration: 195, // 3:15
    transcript: 'Tive dificuldades para me concentrar...',
    emotions: [
      { emotion: 'frustrado', confidence: 0.7 }
    ],
    categories: [
      { category: 'foco-execucao', confidence: 0.8 }
    ],
    status: 'processado',
    createdAt: '2024-01-14T18:45:00Z'
  },
  {
    id: '4',
    userId: 'user-1',
    date: '14/01',
    time: '07:15',
    duration: 88, // 1:28
    transcript: 'Acordei motivado para começar o dia...',
    emotions: [
      { emotion: 'motivado', confidence: 0.95 }
    ],
    categories: [
      { category: 'treino-mental', confidence: 0.9 }
    ],
    status: 'processado',
    createdAt: '2024-01-14T07:15:00Z'
  },
  {
    id: '5',
    userId: 'user-1',
    date: '13/01',
    time: '21:30',
    duration: 172, // 2:52
    transcript: 'Refletindo sobre os aprendizados da semana...',
    emotions: [
      { emotion: 'satisfeito', confidence: 0.8 }
    ],
    categories: [
      { category: 'evolucao-continua', confidence: 0.9 }
    ],
    status: 'processado',
    createdAt: '2024-01-13T21:30:00Z'
  }
];

// Analytics mock data
export const mockEmotionDistribution: EmotionDistribution[] = [
  { emocao: 'Satisfeito', quantidade: 18, cor: '#10b981' },
  { emocao: 'Motivado', quantidade: 12, cor: '#6366f1' },
  { emocao: 'Ansioso', quantidade: 10, cor: '#f59e0b' },
  { emocao: 'Frustrado', quantidade: 7, cor: '#ef4444' }
];

export const mockPatterns: Pattern[] = [
  {
    tipo: 'padrao',
    titulo: 'Padrão Identificado',
    descricao: 'Você se sente mais ansioso nas segundas-feiras',
    icone: 'info'
  },
  {
    tipo: 'progresso',
    titulo: 'Progresso',
    descricao: '78% de melhoria na disciplina este mês',
    icone: 'trending-up'
  },
  {
    tipo: 'recomendacao',
    titulo: 'Recomendação',
    descricao: 'Foque mais em "Treino Mental"',
    icone: 'lightbulb'
  }
];

// Goals mock data
export const mockGoals: Goal[] = [
  {
    id: '1',
    titulo: 'Registrar 5x por semana',
    descricao: 'Manter consistência nos registros diários',
    valorAtual: 4,
    valorAlvo: 5,
    unidade: 'registros',
    status: 'ativa',
    progresso: 80,
    prazo: '2024-01-21',
    categoria: 'Disciplina',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    titulo: 'Melhorar foco em 20%',
    descricao: 'Aumentar pontuação na categoria foco',
    valorAtual: 70,
    valorAlvo: 84,
    unidade: '%',
    status: 'ativa',
    progresso: 25,
    categoria: 'Foco e Execução',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    titulo: 'Meta de disciplina',
    descricao: 'Concluída semana passada',
    valorAtual: 100,
    valorAlvo: 100,
    unidade: '%',
    status: 'concluida',
    progresso: 100,
    categoria: 'Disciplina',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Achievements mock data
export const mockAchievements: Achievement[] = [
  {
    id: '1',
    titulo: '15 dias consecutivos',
    descricao: 'Registro diário por 15 dias seguidos',
    icone: '🔥',
    dataConquista: '2024-01-15',
    tipo: 'streak'
  },
  {
    id: '2',
    titulo: 'Meta de disciplina',
    descricao: 'Primeira meta concluída com sucesso',
    icone: '🎯',
    dataConquista: '2024-01-10',
    tipo: 'meta'
  },
  {
    id: '3',
    titulo: 'Primeiro insight',
    descricao: 'Sistema identificou seu primeiro padrão comportamental',
    icone: '💡',
    dataConquista: '2024-01-08',
    tipo: 'insight'
  }
];

// Helper functions para simular delay de API
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API calls
export const mockApiCall = async <T>(data: T, delayMs: number = 500): Promise<T> => {
  await delay(delayMs);
  return data;
};

// Generate random data for charts
export const generateWeeklyData = (weeks: number = 4) => {
  return Array.from({ length: weeks }, (_, i) => ({
    semana: `S${i + 1}`,
    pontuacao: Math.floor(Math.random() * 20) + 60 + (i * 2) // Trending up
  }));
};

export const generateEmotionData = () => {
  const emotions = ['Satisfeito', 'Motivado', 'Ansioso', 'Frustrado', 'Neutro'];
  const colors = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#6b7280'];
  
  return emotions.map((emotion, index) => ({
    emocao: emotion as EmotionDistribution['emocao'],
    quantidade: Math.floor(Math.random() * 15) + 5,
    cor: colors[index]
  }));
};