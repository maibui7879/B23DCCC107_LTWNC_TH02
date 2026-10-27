import { useCallback, useMemo, useState } from 'react';
import { FixedSizeList, type ListChildComponentProps } from 'react-window';
import { GENRES, SONGS } from '../../data/songs';
import { useDebounce } from '../../hooks/useDebounce';
import { SongRow } from './SongRow';
import { usePlayerStore } from '../player/usePlayerStore';
import { useFavoritesStore } from '../favorites/useFavoritesStore';
import { usePlaylists, usePlaylistDispatch } from '../playlists/PlaylistContext';

export const LibraryPage = () => {
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('');
  const [selected, setSelected] = useState('');
  const debounced = useDebounce(query, 300);
  const playQueue = usePlayerStore((state) => state.playQueue);
  const addToQueue = usePlayerStore((state) => state.addToQueue);
  const favorites = useFavoritesStore((state) => state.ids);
  const toggleFavorite = useFavoritesStore((state) => state.toggle);
  const playlists = usePlaylists();
  const dispatch = usePlaylistDispatch();
  const filtered = useMemo(() => {
    const search = debounced.trim().toLocaleLowerCase();
    const result = SONGS.filter((song) => (!search || `${song.title} ${song.artist}`.toLocaleLowerCase().includes(search)) && (!genre || song.genre === genre));
    return [...result].sort((a, b) => sort === 'name' ? a.title.localeCompare(b.title, 'vi') : sort === 'duration' ? a.duration - b.duration : 0);
  }, [debounced, genre, sort]);
  const play = useCallback((song: typeof SONGS[number]) => playQueue(filtered, Math.max(0, filtered.findIndex((item) => item.id === song.id))), [filtered, playQueue]);
  const add = useCallback((song: typeof SONGS[number]) => { if (selected) dispatch({ type: 'addSong', id: selected, songId: song.id }); else addToQueue(song); }, [addToQueue, dispatch, selected]);
  const row = ({ index, style }: ListChildComponentProps) => { const song = filtered[index]; return <div style={style}><SongRow song={song} index={index} onPlay={play} onQueue={add} queueLabel={selected ? '+ Playlist' : '+ Hàng đợi'} favorite={favorites.includes(song.id)} onFavorite={toggleFavorite} /></div>; };
  return <main><div className="hero"><h1>Thư viện âm thanh</h1></div><div className="filters"><label>Tìm kiếm<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tên bài hát hoặc ca sĩ" /></label><label>Thể loại<select value={genre} onChange={(event) => setGenre(event.target.value)}><option value="">Tất cả</option>{GENRES.map((item) => <option key={item}>{item}</option>)}</select></label><label>Sắp xếp<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="">Mặc định</option><option value="name">Tên A-Z</option><option value="duration">Thời lượng tăng dần</option></select></label>{playlists.length > 0 && <label>Playlist<select value={selected} onChange={(event) => setSelected(event.target.value)}><option value="">Chọn playlist</option>{playlists.map((playlist) => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>)}</select></label>}</div><p className="count">{filtered.length ? `Tìm thấy ${filtered.length} bài hát` : 'Không tìm thấy bài hát nào.'}</p>{selected && <p className="hint">Đang thêm vào: {playlists.find((playlist) => playlist.id === selected)?.name}</p>}{filtered.length > 0 && <FixedSizeList height={560} width="100%" itemCount={filtered.length} itemSize={56} itemKey={(index) => filtered[index].id}>{row}</FixedSizeList>}</main>;
};
