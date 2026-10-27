import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlaylistDispatch, usePlaylists } from './PlaylistContext';
import type { Playlist } from './playlistReducer';

function PlaylistCard({ playlist, onRemove }: { playlist: Playlist; onRemove: (id: string) => void }) {
  return (
    <article className="playlist-card">
      <h2>{playlist.name}</h2>
      <p>{playlist.songIds.length} bài</p>
      <Link to={`/playlists/${playlist.id}`}>Xem chi tiết →</Link>
      <button type="button" onClick={() => onRemove(playlist.id)}>
        Xóa
      </button>
    </article>
  );
}

function CreatePlaylistForm({ onCreate, error }: { onCreate: (name: string) => void; error: string }) {
  const [name, setName] = useState('');
  const handleSubmit = () => {
    onCreate(name);
    setName('');
  };
  return (
    <>
      <div className="create-form">
        <label>
          Tên playlist
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>
          Tạo
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default function PlaylistsPage() {
  const playlists = usePlaylists();
  const dispatch = usePlaylistDispatch();
  const [error, setError] = useState('');

  const createPlaylist = (name: string) => {
    const cleanName = name.trim();
    if (!cleanName) {
      setError('Tên playlist không được trống');
      return;
    }
    if (playlists.some((playlist) => playlist.name.toLocaleLowerCase() === cleanName.toLocaleLowerCase())) {
      setError('Tên playlist đã tồn tại');
      return;
    }
    dispatch({ type: 'create', name: cleanName });
    setError('');
  };

  return (
    <main>
      <div className="hero">
        <p className="eyebrow">COLLECTIONS</p>
        <h1>Playlist của bạn</h1>
      </div>
      <CreatePlaylistForm onCreate={createPlaylist} error={error} />
      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} onRemove={(id) => dispatch({ type: 'remove', id })} />
        ))}
      </div>
    </main>
  );
}
