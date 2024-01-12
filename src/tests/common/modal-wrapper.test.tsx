import { ModalWrapper } from '@/components/common';
import { render, screen } from '@/configs/test-utils';
import { describe, expect, it, vi } from 'vitest';

describe('test <ModalWrapper/>', () => {
  const mockFn = vi.fn();
  it('should render correctly', () => {
    render(
      <ModalWrapper
        open={true}
        handleOpenState={mockFn}
        modalWidth={'450'}
        modalHeight={'650'}
        title={'ModalTitle'}
        actionStack={<div></div>}
      >
        <div>
          <p>rendered inside modalWrapper</p>
        </div>
      </ModalWrapper>,
    );
    expect(screen.getByText(/rendered inside modalwrapper/i)).toBeTruthy();
    expect(screen.getByText(/modaltitle/i)).toBeTruthy();
  });
  it('should be empty', () => {
    const { container } = render(
      <ModalWrapper
        open={false}
        handleOpenState={mockFn}
        modalWidth={'450'}
        modalHeight={'650'}
        title={'ModalTitle'}
        actionStack={<div></div>}
      >
        <div>
          <p>rendered inside modalWrapper</p>
        </div>
      </ModalWrapper>,
    );

    expect(container.firstChild?.firstChild).toBeNull();
  });
});
