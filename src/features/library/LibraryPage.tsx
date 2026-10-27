import { useCallback, useMemo, useState } from 'react';
import { SONGS } from '../../data/songs';
import type { Genre, Song } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import { handleQueryShift } from '../../utils/query';
import { useFavoritesStore } from '../favorites/useFavoritesStore';
import { usePlayerStore } from '../player/usePlayerStore';
import { LibraryFilters, type SortOption } from './LibraryFilters';
import { PlaylistPickerModal } from './PlaylistPickerModal';
import { SongList } from './SongList';

const SEARCH_DELAY = 300;

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
}

function filterSongs(songs: Song[], query: string, genre: Genre | '', sort: SortOption) {
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
  const [songForPlaylist, setSongForPlaylist] = useState<Song | null>(null);
  const debouncedQuery = useDebounce(query, SEARCH_DELAY);
  const favoriteIds = useFavoritesStore((state) => state.ids);
  const toggleFavorite = useFavoritesStore((state) => state.toggle);
  const playQueue = usePlayerStore((state) => state.playQueue);
  const addToQueue = usePlayerStore((state) => state.addToQueue);
  const songs = useMemo(() => filterSongs(SONGS, debouncedQuery, genre, sort), [debouncedQuery, genre, sort]);

  const playSong = useCallback((song: Song) => playQueue([song], 0), [playQueue]);
  const addSongToQueue = useCallback((song: Song) => addToQueue(song), [addToQueue]);
  const openPlaylistPicker = useCallback((song: Song) => setSongForPlaylist(song), []);
  const handleQueryChange = (value: string) => setQuery(handleQueryShift(value));
  return (
    <main>
      <div className="hero">
        <h1>Trình phát nhạc</h1>
      </div>
      <LibraryFilters
        query={query}
        genre={genre}
        sort={sort}
        onQueryChange={handleQueryChange}
        onGenreChange={setGenre}
        onSortChange={setSort}
      />
      <p className="count">{songs.length ? `Tìm thấy ${songs.length} bài hát` : 'Không tìm thấy bài hát nào.'}</p>
      {songs.length > 0 && (
        <SongList
          songs={songs}
          favoriteIds={favoriteIds}
          onPlay={playSong}
          onQueue={addSongToQueue}
          onAddToPlaylist={openPlaylistPicker}
          onFavorite={toggleFavorite}
        />
      )}
      {songForPlaylist && <PlaylistPickerModal song={songForPlaylist} onClose={() => setSongForPlaylist(null)} />}
    </main>
  );
}
