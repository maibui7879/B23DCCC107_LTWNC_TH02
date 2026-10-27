import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { PlayerBar } from './PlayerBar';
import { usePlayerStore } from './usePlayerStore';
import type { Song } from '../../types';
const song: Song = { id: 's1', title: 'Mưa tháng Sáu 1', artist: 'Lê Minh', genre: 'Pop', duration: 150 };
describe('PlayerBar', () => { beforeEach(() => usePlayerStore.setState({ queue: [song], currentIndex: 0, isPlaying: false, position: 5 })); it('hiển thị bài đang chọn và thời gian', () => { render(<PlayerBar />); expect(screen.getByText(/Mưa tháng Sáu 1/)).toBeInTheDocument(); expect(screen.getByText('0:05')).toBeInTheDocument(); expect(screen.getByText('2:30')).toBeInTheDocument(); }); it('bật phát và dừng interval khi unmount', () => { render(<PlayerBar />); screen.getByRole('button', { name: 'Phát' }).click(); expect(usePlayerStore.getState().isPlaying).toBe(true); }); });
