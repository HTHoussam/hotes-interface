import { act, fireEvent, render, screen, waitFor } from '@/configs/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { ActionsButton } from '..';

describe('test <ActionsButton/>', () => {
  it('should render correctly', () => {
    render(<ActionsButton discardTitle="discard" formId="dede" handleDiscard={() => {}} submitTitle="dede" />);
    expect(
      screen.getByRole('button', {
        name: /discard/i,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole('button', {
        name: /dede/i,
      }),
    ).toBeTruthy();
  });
  it('should render correctly', async () => {
    const mockFn = vi.fn();
    render(<ActionsButton discardTitle="discard" formId="form-id" handleDiscard={mockFn} submitTitle="submit" />);
    const discardBTN = screen.getByRole('button', {
      name: /discard/i,
    });
    act(() => {
      fireEvent.click(discardBTN);
    });
    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledOnce();
    });
  });
});
