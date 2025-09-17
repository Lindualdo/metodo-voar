import { create } from 'zustand';
import { AudioRecord } from '@/types';
import { mockAudioRecords, mockApiCall } from '@/lib/mock-data';

interface AudioState {
  // Data
  audioRecords: AudioRecord[];
  currentAudio: AudioRecord | null;
  
  // Player state
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  
  // Loading states
  isLoadingRecords: boolean;
  isLoadingPlayer: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  fetchAudioRecords: () => Promise<void>;
  selectAudio: (audio: AudioRecord) => void;
  clearCurrentAudio: () => void;
  
  // Player actions
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  
  // Utility actions
  clearError: () => void;
  resetPlayer: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  audioRecords: [],
  currentAudio: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  playbackRate: 1,
  isLoadingRecords: false,
  isLoadingPlayer: false,
  error: null,

  // Fetch audio records
  fetchAudioRecords: async () => {
    try {
      set({ isLoadingRecords: true, error: null });
      
      // Simulate API call
      const audioRecords = await mockApiCall(mockAudioRecords, 1000);
      
      set({ 
        audioRecords,
        isLoadingRecords: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao carregar áudios',
        isLoadingRecords: false 
      });
    }
  },

  // Select audio for playing
  selectAudio: (audio: AudioRecord) => {
    const state = get();
    
    // Reset player if different audio
    if (state.currentAudio?.id !== audio.id) {
      set({
        currentAudio: audio,
        isPlaying: false,
        currentTime: 0,
        duration: audio.duration
      });
    }
  },

  // Clear current audio
  clearCurrentAudio: () => {
    set({
      currentAudio: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0
    });
  },

  // Player controls
  play: () => {
    const state = get();
    if (state.currentAudio) {
      set({ isPlaying: true });
    }
  },

  pause: () => {
    set({ isPlaying: false });
  },

  seek: (time: number) => {
    const state = get();
    const clampedTime = Math.max(0, Math.min(time, state.duration));
    set({ currentTime: clampedTime });
  },

  setVolume: (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    set({ volume: clampedVolume });
  },

  setPlaybackRate: (rate: number) => {
    const clampedRate = Math.max(0.5, Math.min(2, rate));
    set({ playbackRate: clampedRate });
  },

  setCurrentTime: (time: number) => {
    set({ currentTime: time });
  },

  setDuration: (duration: number) => {
    set({ duration });
  },

  // Utility actions
  clearError: () => set({ error: null }),

  resetPlayer: () => {
    set({
      currentAudio: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      playbackRate: 1
    });
  },
}));