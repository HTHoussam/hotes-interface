import { render, screen } from '@/configs/test-utils';
import { ModuleBox } from '@/pages/home/components';
import { PeopleFill } from 'react-bootstrap-icons';
import { describe, expect, it } from 'vitest';

describe('test <ModuleBox/>', () => {
  it('should render correctly', () => {
    render(<ModuleBox icon={<PeopleFill size={25} />} title="OnBoarding" props={{}} />);
    expect(screen.getByText(/onboarding/i)).toBeTruthy();
    expect(screen.findByTestId('ModuleBox-icon')).toBeTruthy();
  });
});
