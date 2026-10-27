import { useCallback, useMemo, useState } from 'react';
import { FixedSizeList, type ListChildComponentProps } from 'react-window';
import { GENRES, SONGS } from '../../data/songs';
import { useDebounce } from '../../hooks/useDebounce';
import { SongRow } from './SongRow';
import { usePlayerStore, useFavoritesStore } from '../player/usePlayerStore';
import { usePlaylists, usePlaylistDispatch } from '../playlists/PlaylistContext';
import { handleQueryShift } from '../../App';

export const LibraryPage = () => {
  const [query, setQuery] = useState(''); const [genre, setGenre] = useState(''); const [sort, setSort] = useState(''); const [selected, setSelected] = useState('');
  const queryHandler = handleQueryShift; const debounced = useDebounce(queryHandler(query), 300); const playQueue = usePlayerStore((s) => s.playQueue); const addToQueue = usePlayerStore((s) => s.addToQueue);
  const favorites = useFavoritesStore((s) => s.ids); const toggleFavorite = useFavoritesStore((s) => s.toggle); const playlists = usePlaylists(); const dispatch = usePlaylistDispatch();
  const filtered = useMemo(() => { const q = debounced.trim().toLocaleLowerCase(); const result = SONGS.filter((s) => (!q || `${s.title} ${s.artist}`.toLocaleLowerCase().includes(q)) && (!genre || s.genre === genre)); return [...result].sort((a, b) => sort === 'name' ? a.title.localeCompare(b.title, 'vi') : sort === 'duration' ? a.duration - b.duration : 0); }, [debounced, genre, sort]);
  const play = useCallback((song: typeof SONGS[number]) => playQueue(filtered, Math.max(0, filtered.findIndex((item) => item.id === song.id))), [filtered, playQueue]);
  const queue = useCallback((song: typeof SONGS[number]) => { if (selected) dispatch({ type: 'addSong', id: selected, songId: song.id }); else addToQueue(song); }, [addToQueue, dispatch, selected]);
  const row = ({ index, style }: ListChildComponentProps) => { const song = filtered[index]; return <div style={style}><SongRow song={song} index={index} onPlay={play} onQueue={queue} favorite={favorites.includes(song.id)} onFavorite={toggleFavorite} /></div>; };
  return <main><div className="hero"><p className="eyebrow">MUSIC / 02</p><h1>Thư viện âm thanh</h1><p className="muted">Một kho nhạc nhỏ, đủ để ngày dài có nhịp điệu.</p></div><div className="filters"><label>Tìm kiếm<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tên bài hát hoặc ca sĩ" /></label><label>Thể loại<select value={genre} onChange={(e) => setGenre(e.target.value)}><option value="">Tất cả</option>{GENRES.map((g) => <option key={g}>{g}</option>)}</select></label><label>Sắp xếp<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="">Mặc định</option><option value="name">Tên A-Z</option><option value="duration">Thời lượng tăng dần</option></select></label>{playlists.length > 0 && <label>Playlist<select value={selected} onChange={(e) => setSelected(e.target.value)}><option value="">Chọn playlist</option>{playlists.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>}</div><p className="count">{filtered.length ? `Tìm thấy ${filtered.length} bài hát` : 'Không tìm thấy bài hát nào.'}</p>{selected && <p className="hint">Đang thêm vào: {playlists.find((p) => p.id === selected)?.name}</p>}{filtered.length > 0 && <FixedSizeList height={560} width="100%" itemCount={filtered.length} itemSize={56}>{row}</FixedSizeList>}</main>;
};
