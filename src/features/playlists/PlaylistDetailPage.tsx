import { Link, useParams } from 'react-router-dom';
import { SONGS } from '../../data/songs';
import { formatDuration } from '../../utils/format';
import { usePlayerStore } from '../player/usePlayerStore';
import { usePlaylistDispatch, usePlaylists } from './PlaylistContext';
import type { Song } from '../../types';
import type { Playlist } from './playlistReducer';

function resolveSongs(playlist: Playlist): Song[] {
  return playlist.songIds
    .map((songId) => SONGS.find((song) => song.id === songId))
    .filter((song): song is Song => Boolean(song));
}

function PlaylistSongRow({
  playlistId,
  song,
  index,
  onRemove,
}: {
  playlistId: string;
  song: Song;
  index: number;
  onRemove: (playlistId: string, songId: string) => void;
}) {
  return (
    <div className="song-row">
      <span>{index + 1}</span>
      <strong>{song.title}</strong>
      <span>{song.artist}</span>
      <span>{formatDuration(song.duration)}</span>
      <button type="button" onClick={() => onRemove(playlistId, song.id)}>
        Bỏ
      </button>
    </div>
  );
}

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const playlist = usePlaylists().find((item) => item.id === id);
  const dispatch = usePlaylistDispatch();
  const playQueue = usePlayerStore((state) => state.playQueue);

  if (!playlist)
    return (
      <main>
        <p>Không tìm thấy playlist.</p>
        <Link to="/playlists">Quay lại</Link>
      </main>
    );

  const songs = resolveSongs(playlist);
  const totalDuration = songs.reduce((total, song) => total + song.duration, 0);
  const removeSong = (playlistId: string, songId: string) => dispatch({ type: 'removeSong', id: playlistId, songId });

  return (
    <main>
      <Link to="/playlists">← Playlist</Link>
      <div className="hero">
        <p className="eyebrow">PLAYLIST</p>
        <h1>{playlist.name}</h1>
        <p>Tổng thời lượng: {formatDuration(totalDuration)}</p>
        <button type="button" disabled={!songs.length} onClick={() => playQueue(songs, 0)}>
          Phát tất cả
        </button>
      </div>
      {songs.map((song, index) => (
        <PlaylistSongRow key={song.id} playlistId={playlist.id} song={song} index={index} onRemove={removeSong} />
      ))}
    </main>
  );
}
