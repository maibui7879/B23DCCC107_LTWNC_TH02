import { useState } from 'react';
import { SONGS } from '../../data/songs';
import type { Song } from '../../types';
import { usePlayerStore } from '../player/usePlayerStore';
import { useFavoritesStore } from './useFavoritesStore';
import { SongRow } from '../library/SongRow';
import { PlaylistPickerModal } from '../library/PlaylistPickerModal';
export default function FavoritesPage() {
  const [songForPlaylist, setSongForPlaylist] = useState<Song | null>(null);
  const ids = useFavoritesStore((s) => s.ids);
  const toggle = useFavoritesStore((s) => s.toggle);
  const playQueue = usePlayerStore((s) => s.playQueue);
  const songs = SONGS.filter((s) => ids.includes(s.id));
  return (
    <main>
      <div className="hero">
        <p className="eyebrow">Bài hát đã chọn</p>
        <h1>Bài hát yêu thích</h1>
        <button disabled={!songs.length} onClick={() => playQueue(songs, 0)}>
          Phát tất cả
        </button>
      </div>
      {songs.length ? (
        songs.map((song, index) => (
          <SongRow
            key={song.id}
            song={song}
            index={index}
            onPlay={(s) => playQueue(songs, songs.indexOf(s))}
            onQueue={() => undefined}
            onAddToPlaylist={setSongForPlaylist}
            favorite
            onFavorite={toggle}
          />
        ))
      ) : (
        <p className="empty">Bạn chưa có bài hát yêu thích.</p>
      )}
      {songForPlaylist && <PlaylistPickerModal song={songForPlaylist} onClose={() => setSongForPlaylist(null)} />}
    </main>
  );
}
