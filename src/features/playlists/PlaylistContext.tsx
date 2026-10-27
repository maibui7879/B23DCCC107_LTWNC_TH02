import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react';
import { playlistReducer, type Playlist, type PlaylistAction } from './playlistReducer';
import { withLogger } from './withLogger';

export const PlaylistStateContext = createContext<Playlist[] | null>(null);
export const PlaylistDispatchContext = createContext<Dispatch<PlaylistAction> | null>(null);

const STORAGE_KEY = 'music-playlists';

function loadPlaylists(): Playlist[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Playlist[]) : [];
  } catch {
    return [];
  }
}

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlists, dispatch] = useReducer(withLogger(playlistReducer), undefined, loadPlaylists);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  }, [playlists]);

  return (
    <PlaylistStateContext.Provider value={playlists}>
      <PlaylistDispatchContext.Provider value={dispatch}>{children}</PlaylistDispatchContext.Provider>
    </PlaylistStateContext.Provider>
  );
}

export function usePlaylists() {
  const playlists = useContext(PlaylistStateContext);
  if (!playlists) throw new Error('usePlaylists phải được dùng trong PlaylistProvider');
  return playlists;
}

export function usePlaylistDispatch() {
  const dispatch = useContext(PlaylistDispatchContext);
  if (!dispatch) throw new Error('usePlaylistDispatch phải được dùng trong PlaylistProvider');
  return dispatch;
}
