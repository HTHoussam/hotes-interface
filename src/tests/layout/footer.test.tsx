import { Footer } from '@/components/layout/UI';
import { render, screen } from '@/configs/test-utils';
import { describe, expect, it, vi } from 'vitest';

describe('test <Footer/>', () => {
  const mockfn = vi.fn(() => {});
  it('should render correctly', async () => {
    render(<Footer setFooterStatus={mockfn} footerStatus={'expanded'} newsList={[]} />);
    expect(
      screen.getByRole('heading', {
        name: /latest news/i,
      }),
    ).toBeTruthy();
  });
});
