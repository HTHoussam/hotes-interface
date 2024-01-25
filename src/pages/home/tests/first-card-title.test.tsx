import { render, screen } from '@/configs/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { FirstCardTitle } from '../components';

describe('test <FirstCardTitle/>', () => {
  const mockFn = vi.fn();
  it('should render correctly', () => {
    render(<FirstCardTitle title={'Main title'} setOpenReportModal={mockFn}></FirstCardTitle>);
    expect(screen.getByText(/main title/i)).toBeTruthy();
  });
});
