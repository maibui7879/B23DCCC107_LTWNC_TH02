import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LibraryPage } from '../features/library/LibraryPage';

const FavoritesPage = lazy(() => import('../features/favorites/FavoritesPage'));
const PlaylistsPage = lazy(() => import('../features/playlists/PlaylistsPage'));
const PlaylistDetailPage = lazy(() => import('../features/playlists/PlaylistDetailPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<p className="loading">Đang tải trang...</p>}>
      <Routes>
        <Route path="/" element={<LibraryPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
      </Routes>
    </Suspense>
  );
}
