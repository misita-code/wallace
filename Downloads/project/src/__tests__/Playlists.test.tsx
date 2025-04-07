import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Playlists from '../pages/Playlists';
import { AuthProvider } from '../context/AuthContext';

// Mock the fetch function
vi.mock('node-fetch', () => ({
  default: vi.fn()
}));

describe('Playlists Component', () => {
  it('shows login message when not authenticated', () => {
    render(
      <AuthProvider>
        <Playlists />
      </AuthProvider>
    );
    expect(screen.getByText('Please login to view and manage your playlists.')).toBeInTheDocument();
  });
});