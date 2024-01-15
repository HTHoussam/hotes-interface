import Header from '@/components/layout/UI/header';
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
    console.log('mfe', screen.logTestingPlaygroundURL());
    expect(screen.getByText(/municipality : 0219 engstelig tiger as/i)).toBeTruthy();
    console.log("screen.getByTestId('customer-selector')", screen.getByTestId('customer-selector'));
  });
});
