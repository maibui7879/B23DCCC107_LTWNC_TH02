import { useEffect, useRef, useState } from 'react';
import type { Song } from '../../types';
import { usePlaylistDispatch, usePlaylists } from '../playlists/PlaylistContext';

interface PlaylistPickerModalProps {
  song: Song;
  onClose: () => void;
}

export function PlaylistPickerModal({ song, onClose }: PlaylistPickerModalProps) {
  const playlists = usePlaylists();
  const dispatch = usePlaylistDispatch();
  const [playlistId, setPlaylistId] = useState(playlists[0]?.id ?? '');
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    selectRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const addToPlaylist = () => {
    if (!playlistId) return;
    dispatch({ type: 'addSong', id: playlistId, songId: song.id });
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="playlist-modal" role="dialog" aria-modal="true" aria-labelledby="playlist-picker-title">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Thêm bài hát</p>
            <h2 id="playlist-picker-title">Chọn playlist</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        </div>
        <p className="modal-song">{song.title}</p>
        {playlists.length ? (
          <>
            <label className="modal-field">
              Playlist đích
              <select ref={selectRef} value={playlistId} onChange={(event) => setPlaylistId(event.target.value)}>
                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="modal-actions">
              <button type="button" className="button-secondary" onClick={onClose}>
                Hủy
              </button>
              <button type="button" onClick={addToPlaylist}>
                Thêm vào playlist
              </button>
            </div>
          </>
        ) : (
          <p className="empty">Bạn chưa có playlist. Hãy tạo playlist trước trong mục Playlist.</p>
        )}
      </section>
    </div>
  );
}
