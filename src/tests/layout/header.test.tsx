import { Header } from '@/components/layout';
import { render, screen } from '@/configs/test-utils';
import { describe, expect, it } from 'vitest';

describe('test <Header/>', () => {
  it('should render correctly', () => {
    render(<Header />);
    expect(
      screen.getByRole('heading', {
        name: /demo bruker/i,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole('textbox', {
        hidden: true,
      }),
    ).toBeTruthy();
    expect(screen.getByText(/admin/i)).toBeTruthy();
  });
});
