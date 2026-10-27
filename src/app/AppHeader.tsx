import { NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const navigationItems = [
  { to: '/', label: 'Thư viện' },
  { to: '/favorites', label: 'Yêu thích' },
  { to: '/playlists', label: 'Playlist' },
];

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();
  const themeLabel = theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng';

  return (
    <header>
      <div className="brand">
        <span className="mark" aria-hidden="true">
          ♪
        </span>
        <span>Trình phát nhạc mini</span>
      </div>
      <nav aria-label="Điều hướng chính">
        {navigationItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button type="button" onClick={toggleTheme}>
        {themeLabel}
      </button>
    </header>
  );
}
