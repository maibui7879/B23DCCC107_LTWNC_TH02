import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, beforeEach } from 'vitest';
import { PlaylistProvider } from './PlaylistContext';
import PlaylistsPage from './PlaylistsPage';
beforeEach(() => localStorage.clear());
describe('PlaylistsPage', () => { it('báo lỗi tên trống và tạo playlist hợp lệ', async () => { const user = userEvent.setup(); render(<MemoryRouter><PlaylistProvider><PlaylistsPage /></PlaylistProvider></MemoryRouter>); await user.click(screen.getByRole('button', { name: 'Tạo' })); expect(screen.getByText('Tên playlist không được trống')).toBeInTheDocument(); await user.type(screen.getByLabelText('Tên playlist'), 'Chạy bộ'); await user.click(screen.getByRole('button', { name: 'Tạo' })); expect(screen.getByText('Chạy bộ')).toBeInTheDocument(); }); });
