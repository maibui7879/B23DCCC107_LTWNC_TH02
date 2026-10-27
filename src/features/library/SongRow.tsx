import { memo } from 'react';
import type { Song } from '../../types';
import { formatDuration } from '../../utils/format';

interface Props {
  song: Song;
  index: number;
  onPlay: (song: Song) => void;
  onQueue: (song: Song) => void;
  onAddToPlaylist: (song: Song) => void;
  favorite: boolean;
  onFavorite: (id: string) => void;
}

export const SongRow = memo(function SongRow({
  song,
  index,
  onPlay,
  onQueue,
  onAddToPlaylist,
  favorite,
  onFavorite,
}: Props) {
  return (
    <div className="song-row">
      <span>{index + 1}</span>
      <strong>{song.title}</strong>
      <span>{song.artist}</span>
      <span className="tag">{song.genre}</span>
      <span>{formatDuration(song.duration)}</span>
      <div className="song-actions">
        <button type="button" onClick={() => onPlay(song)}>
          Phát
        </button>
        <button type="button" onClick={() => onQueue(song)}>
          + Hàng đợi
        </button>
        <button type="button" onClick={() => onAddToPlaylist(song)}>
          + Playlist
        </button>
        <button
          type="button"
          onClick={() => onFavorite(song.id)}
          aria-label={favorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
});
