import { act, fireEvent, render, screen, waitFor } from '@/configs/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { InnbetaligsRapport } from '../components';

describe('test <InnbetaligsRapport/>', () => {
  const mockFn = vi.fn();
  it('should render correctly', () => {
    render(<InnbetaligsRapport handleCloseModal={mockFn} />);
    expect(screen.getByText(/periode fra:/i)).toBeTruthy();
    expect(screen.getByRole('group')).toBeTruthy();
    expect(screen.getByText(/avdeling:/i)).toBeTruthy();
  });
  it('should behave correctly', async () => {
    render(<InnbetaligsRapport handleCloseModal={mockFn} />);
    const discardBtn = screen.getByRole('button', {
      name: /cancel/i,
    });
    act(() => {
      fireEvent.click(discardBtn);
    });
    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      screen.logTestingPlaygroundURL();
    });
    screen.logTestingPlaygroundURL();
  });
});
