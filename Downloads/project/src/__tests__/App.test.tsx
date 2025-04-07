import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('PlayMusic')).toBeInTheDocument();
  });

  it('shows login link when not authenticated', () => {
    render(<App />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});