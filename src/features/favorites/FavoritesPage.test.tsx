import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import FavoritesPage from './FavoritesPage';
import { useFavoritesStore } from './useFavoritesStore';
beforeEach(() => {
  localStorage.clear();
  useFavoritesStore.setState({ ids: [], toggle: useFavoritesStore.getState().toggle });
});
describe('FavoritesPage', () => {
  it('hiển thị trạng thái rỗng', () => {
    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Bạn chưa có bài hát yêu thích.')).toBeInTheDocument();
  });
  it('hiển thị bài yêu thích', () => {
    useFavoritesStore.setState({ ids: ['s1'], toggle: useFavoritesStore.getState().toggle });
    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Mưa tháng Sáu 1')).toBeInTheDocument();
  });
});
