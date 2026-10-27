import { beforeEach, describe, expect, it } from 'vitest';
import { usePlayerStore } from './usePlayerStore';
import type { Song } from '../../types';
const songs: Song[] = [
  { id: 's1', title: 'Một', artist: 'A', genre: 'Pop', duration: 150 },
  { id: 's2', title: 'Hai', artist: 'B', genre: 'Rock', duration: 187 },
];
describe('usePlayerStore', () => {
  beforeEach(() => usePlayerStore.setState({ queue: [], currentIndex: -1, isPlaying: false, position: 0 }));
  it('phát đúng bài bắt đầu', () => {
    usePlayerStore.getState().playQueue(songs, 1);
    expect(usePlayerStore.getState().queue[1].id).toBe('s2');
  });
  it('tick tăng một giây', () => {
    usePlayerStore.getState().playQueue(songs, 0);
    usePlayerStore.getState().tick();
    expect(usePlayerStore.getState().position).toBe(1);
  });
  it('tick cuối bài chuyển bài sau', () => {
    usePlayerStore.getState().playQueue(songs, 0);
    usePlayerStore.setState({ position: 149 });
    usePlayerStore.getState().tick();
    expect(usePlayerStore.getState().currentIndex).toBe(1);
  });
  it('next ở bài cuối dừng phát', () => {
    usePlayerStore.getState().playQueue(songs, 1);
    usePlayerStore.getState().next();
    expect(usePlayerStore.getState().isPlaying).toBe(false);
  });
  it('thêm bài đầu tiên vào hàng đợi để sẵn sàng phát', () => {
    usePlayerStore.getState().addToQueue(songs[0]);

    expect(usePlayerStore.getState().queue).toEqual([songs[0]]);
    expect(usePlayerStore.getState().currentIndex).toBe(0);
    expect(usePlayerStore.getState().isPlaying).toBe(false);

    usePlayerStore.getState().togglePlay();
    expect(usePlayerStore.getState().isPlaying).toBe(true);
  });
});
