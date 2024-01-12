import { Footer } from '@/components/layout';
import { render, screen } from '@/configs/test-utils';
import { describe, expect, it } from 'vitest';

describe('test <Footer/>', () => {
  it('should render correctly', async () => {
    render(<Footer />);
    expect(
      screen.getByRole('heading', {
        name: /latest news/i,
      }),
    ).toBeTruthy();
  });
});
