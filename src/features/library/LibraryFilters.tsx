import type { Genre } from '../../types';
import { GENRES } from '../../data/songs';

export type SortOption = '' | 'name' | 'duration';

interface LibraryFiltersProps {
  query: string;
  genre: Genre | '';
  sort: SortOption;
  onQueryChange: (query: string) => void;
  onGenreChange: (genre: Genre | '') => void;
  onSortChange: (sort: SortOption) => void;
}

export function LibraryFilters({
  query,
  genre,
  sort,
  onQueryChange,
  onGenreChange,
  onSortChange,
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
    </div>
  );
}
