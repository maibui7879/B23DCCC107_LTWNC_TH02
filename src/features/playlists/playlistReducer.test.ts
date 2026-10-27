import { describe, expect, it } from 'vitest';
import { playlistReducer, type Playlist } from './playlistReducer';
describe('playlistReducer', () => {
  const state: Playlist[] = [{ id: 'p1', name: 'Chạy bộ', songIds: ['s1'] }];
  it('tạo playlist', () => { expect(playlistReducer([], { type: 'create', name: 'Mới' })).toHaveLength(1); });
  it('không thêm bài trùng', () => { expect(playlistReducer(state, { type: 'addSong', id: 'p1', songId: 's1' })[0].songIds).toEqual(['s1']); });
  it('thêm và xóa bài', () => { const added = playlistReducer(state, { type: 'addSong', id: 'p1', songId: 's2' }); expect(playlistReducer(added, { type: 'removeSong', id: 'p1', songId: 's1' })[0].songIds).toEqual(['s2']); });
  it('xóa playlist không tồn tại giữ nguyên state', () => { expect(playlistReducer(state, { type: 'remove', id: 'none' })).toEqual(state); });
});
