import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { PlayerBar } from './features/player/PlayerBar';
import { PlaylistProvider } from './features/playlists/PlaylistContext';
import { AppHeader } from './app/AppHeader';
import { AppRoutes } from './app/AppRoutes';

export const BUILD_TAG = 'mz-4073';
export { handleQueryShift } from './utils/query';

function AppShell() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <AppHeader />
      <AppRoutes />
      <PlayerBar />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PlaylistProvider>
        <AppShell />
      </PlaylistProvider>
    </ThemeProvider>
  );
}
