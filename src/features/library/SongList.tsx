import { FixedSizeList, type ListChildComponentProps } from 'react-window';
import type { Song } from '../../types';
import { SongRow } from './SongRow';

interface SongListProps {
  songs: Song[];
  favoriteIds: string[];
  onPlay: (song: Song) => void;
  onQueue: (song: Song) => void;
  onAddToPlaylist: (song: Song) => void;
  onFavorite: (id: string) => void;
}

export function SongList({ songs, favoriteIds, onPlay, onQueue, onAddToPlaylist, onFavorite }: SongListProps) {
  const renderRow = ({ index, style }: ListChildComponentProps) => {
    const song = songs[index];
    return (
      <div style={style}>
        <SongRow
          song={song}
          index={index}
          onPlay={onPlay}
          onQueue={onQueue}
          onAddToPlaylist={onAddToPlaylist}
          favorite={favoriteIds.includes(song.id)}
          onFavorite={onFavorite}
        />
      </div>
    );
  };

  return (
    <FixedSizeList
      height={560}
      width="100%"
      itemCount={songs.length}
      itemSize={56}
      itemKey={(index) => songs[index].id}
    >
      {renderRow}
    </FixedSizeList>
  );
}
