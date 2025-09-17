import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format time utilities
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatTime(timeString: string): string {
  // Input: "14:30" -> Output: "14:30"
  return timeString;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  });
}

export function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Há poucos minutos';
  if (diffInHours < 24) return `Há ${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Ontem';
  if (diffInDays < 7) return `Há ${diffInDays} dias`;
  
  return formatDate(dateString);
}

// Progress utilities
export function calculateProgress(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

export function getProgressColor(progress: number): string {
  if (progress >= 80) return 'text-green-600';
  if (progress >= 60) return 'text-blue-600';
  if (progress >= 40) return 'text-yellow-600';
  return 'text-red-500';
}

export function getProgressBgColor(progress: number): string {
  if (progress >= 80) return 'bg-green-100 dark:bg-green-900/20';
  if (progress >= 60) return 'bg-blue-100 dark:bg-blue-900/20';
  if (progress >= 40) return 'bg-yellow-100 dark:bg-yellow-900/20';
  return 'bg-red-100 dark:bg-red-900/20';
}

// Emotion utilities
export function getEmotionColor(emotion: string): string {
  const colors = {
    'satisfeito': '#10b981',
    'ansioso': '#f59e0b', 
    'frustrado': '#ef4444',
    'motivado': '#6366f1',
    'neutro': '#6b7280'
  };
  return colors[emotion.toLowerCase() as keyof typeof colors] || colors.neutro;
}

export function getEmotionIcon(emotion: string): string {
  const icons = {
    'satisfeito': '😊',
    'ansioso': '😰',
    'frustrado': '😤',
    'motivado': '💪',
    'neutro': '😐'
  };
  return icons[emotion.toLowerCase() as keyof typeof icons] || icons.neutro;
}

// Category utilities
export function getCategoryColor(category: string): string {
  const colors = {
    'autoconhecimento': '#6366f1',
    'disciplina': '#10b981',
    'treino-mental': '#f59e0b',
    'foco-execucao': '#ef4444',
    'evolucao-continua': '#8b5cf6'
  };
  return colors[category.toLowerCase().replace(/\s/g, '-') as keyof typeof colors] || '#6b7280';
}

export function getCategoryIcon(category: string): string {
  const icons = {
    'autoconhecimento': '🧠',
    'disciplina': '💪',
    'treino-mental': '🎯',
    'foco-execucao': '⚡',
    'evolucao-continua': '📈'
  };
  return icons[category.toLowerCase().replace(/\s/g, '-') as keyof typeof icons] || '📝';
}

// Audio utilities
export function formatAudioSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

// Local storage utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setInStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing localStorage key "${key}":`, error);
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
}

// URL utilities
export function generateAvatarUrl(name: string): string {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=6366f1&color=fff&size=40`;
}

// Chart utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Number utilities
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Random utilities for mock data
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}