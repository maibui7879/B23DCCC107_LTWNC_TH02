import { create } from 'zustand';
import type { Song } from '../../types';
export interface PlayerState {
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  position: number;
  playQueue: (songs: Song[], startIndex: number) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  addToQueue: (song: Song) => void;
  tick: () => void;
}
export const usePlayerStore = create<PlayerState>()((set, get) => ({
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  position: 0,
  playQueue: (queue, currentIndex) => set({ queue, currentIndex, isPlaying: true, position: 0 }),
  togglePlay: () => set((s) => ({ isPlaying: s.currentIndex >= 0 ? !s.isPlaying : false })),
  next: () =>
    set((s) =>
      s.currentIndex < 0 || s.currentIndex >= s.queue.length - 1
        ? { isPlaying: false, position: 0 }
        : { currentIndex: s.currentIndex + 1, position: 0, isPlaying: true },
    ),
  prev: () =>
    set((s) =>
      s.position > 3
        ? { position: 0 }
        : s.currentIndex > 0
          ? { currentIndex: s.currentIndex - 1, position: 0, isPlaying: true }
          : { position: 0 },
    ),
  addToQueue: (song) => set((s) => (s.queue.some((item) => item.id === song.id) ? s : { queue: [...s.queue, song] })),
  tick: () => {
    const s = get();
    const song = s.queue[s.currentIndex];
    if (!song) return;
    if (s.position + 1 >= song.duration) get().next();
    else set({ position: s.position + 1 });
  },
}));
