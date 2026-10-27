import { beforeEach, describe, expect, it } from 'vitest';
import { useFavoritesStore } from './useFavoritesStore';

describe('useFavoritesStore', () => {
  beforeEach(() => { localStorage.clear(); useFavoritesStore.setState({ ids: [] }); });
  it('thêm và bỏ yêu thích theo id', () => { useFavoritesStore.getState().toggle('s1'); expect(useFavoritesStore.getState().ids).toEqual(['s1']); useFavoritesStore.getState().toggle('s1'); expect(useFavoritesStore.getState().ids).toEqual([]); });
  it('không làm mất bài yêu thích khác', () => { useFavoritesStore.setState({ ids: ['s1', 's2'] }); useFavoritesStore.getState().toggle('s1'); expect(useFavoritesStore.getState().ids).toEqual(['s2']); });
});
