import type { Genre } from '../../types';
import { GENRES } from '../../data/songs';
import type { Playlist } from '../playlists/playlistReducer';

export type SortOption = '' | 'name' | 'duration';

interface LibraryFiltersProps {
  query: string;
  genre: Genre | '';
  sort: SortOption;
  selectedPlaylistId: string;
  playlists: Playlist[];
  onQueryChange: (query: string) => void;
  onGenreChange: (genre: Genre | '') => void;
  onSortChange: (sort: SortOption) => void;
  onPlaylistChange: (playlistId: string) => void;
}

export function LibraryFilters({
  query,
  genre,
  sort,
  selectedPlaylistId,
  playlists,
  onQueryChange,
  onGenreChange,
  onSortChange,
  onPlaylistChange,
}: LibraryFiltersProps) {
  return (
    <div className="filters">
      <label>
        Tìm kiếm
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Tên bài hát hoặc ca sĩ"
        />
      </label>
      <label>
        Thể loại
        <select value={genre} onChange={(event) => onGenreChange(event.target.value as Genre | '')}>
          <option value="">Tất cả</option>
          {GENRES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label>
        Sắp xếp
        <select value={sort} onChange={(event) => onSortChange(event.target.value as SortOption)}>
          <option value="">Mặc định</option>
          <option value="name">Tên A-Z</option>
          <option value="duration">Thời lượng tăng dần</option>
        </select>
      </label>
      {playlists.length > 0 && (
        <label>
          Playlist
          <select value={selectedPlaylistId} onChange={(event) => onPlaylistChange(event.target.value)}>
            <option value="">Chọn playlist</option>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
