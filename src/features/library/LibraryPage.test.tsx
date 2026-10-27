import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { PlaylistProvider } from '../playlists/PlaylistContext';
import { LibraryPage } from './LibraryPage';
beforeEach(() => localStorage.clear());
describe('LibraryPage', () => { it('hiển thị thư viện và lọc theo từ khóa sau debounce', async () => { const user = userEvent.setup(); render(<MemoryRouter><PlaylistProvider><LibraryPage /></PlaylistProvider></MemoryRouter>); expect(screen.getByText('Tìm thấy 10000 bài hát')).toBeInTheDocument(); await user.type(screen.getByLabelText('Tìm kiếm'), 'xyz'); await waitFor(() => expect(screen.getByText('Không tìm thấy bài hát nào.')).toBeInTheDocument(), { timeout: 500 }); }); it('lọc theo thể loại', async () => { const user = userEvent.setup(); render(<MemoryRouter><PlaylistProvider><LibraryPage /></PlaylistProvider></MemoryRouter>); await user.selectOptions(screen.getByLabelText('Thể loại'), 'Rock'); expect(screen.getByText('Tìm thấy 2000 bài hát')).toBeInTheDocument(); }); });
