import { useCallback, useMemo, useState } from 'react';
import { SONGS } from '../../data/songs';
import { useDebounce } from '../../hooks/useDebounce';
import { useFavoritesStore } from '../favorites/useFavoritesStore';
import { usePlayerStore } from '../player/usePlayerStore';
import { usePlaylistDispatch, usePlaylists } from '../playlists/PlaylistContext';
import type { Genre, Song } from '../../types';
import { handleQueryShift } from '../../utils/query';
import { LibraryFilters, type SortOption } from './LibraryFilters';
import { SongList } from './SongList';

const SEARCH_DELAY = 300;

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}

function filterSongs(songs: Song[], query: string, genre: string, sort: SortOption) {
  const normalizedQuery = normalizeText(query.trim());
  const filtered = songs.filter((song) => {
    const searchableText = normalizeText(`${song.title} ${song.artist}`);
    return (!normalizedQuery || searchableText.includes(normalizedQuery)) && (!genre || song.genre === genre);
  });
  return [...filtered].sort((a, b) => {
    if (sort === 'name') return a.title.localeCompare(b.title, 'vi');
    if (sort === 'duration') return a.duration - b.duration;
    return 0;
  });
}

export function LibraryPage() {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<Genre | ''>('');
  const [sort, setSort] = useState<SortOption>('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
  const debouncedQuery = useDebounce(query, SEARCH_DELAY);
  const playlists = usePlaylists();
  const dispatch = usePlaylistDispatch();
  const favoriteIds = useFavoritesStore((state) => state.ids);
  const toggleFavorite = useFavoritesStore((state) => state.toggle);
  const playQueue = usePlayerStore((state) => state.playQueue);
  const addToQueue = usePlayerStore((state) => state.addToQueue);
  const songs = useMemo(() => filterSongs(SONGS, debouncedQuery, genre, sort), [debouncedQuery, genre, sort]);

  const playSong = useCallback(
    (song: Song) => {
      const startIndex = songs.findIndex((item) => item.id === song.id);
      playQueue(songs, Math.max(0, startIndex));
    },
    [playQueue, songs],
  );

  const addSong = useCallback(
    (song: Song) => {
      if (selectedPlaylistId) dispatch({ type: 'addSong', id: selectedPlaylistId, songId: song.id });
      else addToQueue(song);
    },
    [addToQueue, dispatch, selectedPlaylistId],
  );

  const handleQueryChange = (value: string) => setQuery(handleQueryShift(value));
  const selectedPlaylist = playlists.find((playlist) => playlist.id === selectedPlaylistId);

  return (
    <main>
      <div className="hero">
        <h1>Thư viện âm thanh</h1>
      </div>
      <LibraryFilters
        query={query}
        genre={genre}
        sort={sort}
        selectedPlaylistId={selectedPlaylistId}
        playlists={playlists}
        onQueryChange={handleQueryChange}
        onGenreChange={setGenre}
        onSortChange={setSort}
        onPlaylistChange={setSelectedPlaylistId}
      />
      <p className="count">{songs.length ? `Tìm thấy ${songs.length} bài hát` : 'Không tìm thấy bài hát nào.'}</p>
      {selectedPlaylist && <p className="hint">Đang thêm vào: {selectedPlaylist.name}</p>}
      {songs.length > 0 && (
        <SongList
          songs={songs}
          favoriteIds={favoriteIds}
          queueLabel={selectedPlaylistId ? '+ Playlist' : '+ Hàng đợi'}
          onPlay={playSong}
          onQueue={addSong}
          onFavorite={toggleFavorite}
        />
      )}
    </main>
  );
}
