export interface Playlist { id: string; name: string; songIds: string[]; }
export type PlaylistAction = { type: 'create'; name: string } | { type: 'rename'; id: string; name: string } | { type: 'remove'; id: string } | { type: 'addSong'; id: string; songId: string } | { type: 'removeSong'; id: string; songId: string };
export const playlistReducer = (state: Playlist[], action: PlaylistAction): Playlist[] => {
  switch (action.type) {
    case 'create': return [...state, { id: crypto.randomUUID(), name: action.name, songIds: [] }];
    case 'rename': return state.map((p) => p.id === action.id ? { ...p, name: action.name } : p);
    case 'remove': return state.filter((p) => p.id !== action.id);
    case 'addSong': return state.map((p) => p.id === action.id && !p.songIds.includes(action.songId) ? { ...p, songIds: [...p.songIds, action.songId] } : p);
    case 'removeSong': return state.map((p) => p.id === action.id ? { ...p, songIds: p.songIds.filter((id) => id !== action.songId) } : p);
  }
};
