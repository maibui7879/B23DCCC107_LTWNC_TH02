import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SongRow } from './SongRow';
import type { Song } from '../../types';
const song: Song = { id: 's1', title: 'Mưa tháng Sáu 1', artist: 'Lê Minh', genre: 'Pop', duration: 150 };
describe('SongRow', () => {
  it('hiển thị bài hát và gọi thao tác', async () => {
    const onPlay = vi.fn();
    const onQueue = vi.fn();
    const onFavorite = vi.fn();
    render(
      <SongRow
        song={song}
        index={0}
        onPlay={onPlay}
        onQueue={onQueue}
        onAddToPlaylist={vi.fn()}
        favorite={false}
        onFavorite={onFavorite}
      />,
    );
    expect(screen.getByText(song.title)).toBeInTheDocument();
    await screen.getByRole('button', { name: 'Phát' }).click();
    await screen.getByRole('button', { name: '+ Hàng đợi' }).click();
    await screen.getByRole('button', { name: 'Thêm vào yêu thích' }).click();
    expect(onPlay).toHaveBeenCalledWith(song);
    expect(onQueue).toHaveBeenCalledWith(song);
    expect(onFavorite).toHaveBeenCalledWith(song.id);
  });
});
