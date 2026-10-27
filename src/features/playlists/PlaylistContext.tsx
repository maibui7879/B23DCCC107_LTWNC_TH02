import { createContext, useContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react';
import { playlistReducer, type Playlist, type PlaylistAction } from './playlistReducer';
import { withLogger } from './withLogger';
const State = createContext<Playlist[] | null>(null); const DispatchContext = createContext<Dispatch<PlaylistAction> | null>(null);
const initial = (): Playlist[] => { try { return JSON.parse(localStorage.getItem('music-playlists') ?? '[]') as Playlist[]; } catch { return []; } };
export const PlaylistProvider = ({ children }: { children: ReactNode }) => { const [playlists, dispatch] = useReducer(withLogger(playlistReducer), undefined, initial); useEffect(() => localStorage.setItem('music-playlists', JSON.stringify(playlists)), [playlists]); return <State.Provider value={playlists}><DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider></State.Provider>; };
export const usePlaylists = () => { const value = useContext(State); if (!value) throw new Error('usePlaylists phải được dùng trong PlaylistProvider'); return value; };
export const usePlaylistDispatch = () => { const value = useContext(DispatchContext); if (!value) throw new Error('usePlaylistDispatch phải được dùng trong PlaylistProvider'); return value; };
