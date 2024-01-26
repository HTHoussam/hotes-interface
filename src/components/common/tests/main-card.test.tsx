import { render, screen } from '@/configs/test-utils';
import { describe, expect, it } from 'vitest';
import { MainCard } from '..';
describe('test <MainCard/>', () => {
  it('should render correctly with its children', () => {
    render(
      <MainCard title={'test'}>
        <>
          <div>dede</div>
          <div>test</div>
        </>
      </MainCard>,
    );
    expect(
      screen.getByRole('heading', {
        name: /test/i,
      }),
    ).toBeTruthy();
    expect(screen.getByText(/dede/i));
    const mainCardContent = screen.getByTestId('mainCard-cardContent');
    console.log('mainCardContent', mainCardContent);
    expect(mainCardContent);
  });
});
