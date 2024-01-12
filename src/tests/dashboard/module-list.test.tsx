import { render, screen } from '@/configs/test-utils';
import { ModuleListGrid } from '@/pages/home/components';
import { FlexType } from '@/types';
import { PeopleFill, Tools } from 'react-bootstrap-icons';
import { describe, expect, it } from 'vitest';
const mockList = [
  {
    title: 'Admin',
    icon: <Tools data-testid={'tools-icon'} size={25} />,
    link: '',
    text: 'Consectetur reprehenderit adipisicing officia eiusmod voluptate qui incididunt.',
  },
  {
    title: 'OnBoarding',
    icon: <PeopleFill data-testid={'people-icon'} size={25} />,
    link: '',
    text: 'doemdoemd',
  },
];
describe('test <ModuleListGrid/>', () => {
  it('should render correctly', () => {
    render(<ModuleListGrid gridType={FlexType.largeGrid} modulesList={mockList} />);
    expect(screen.getByText(/onboarding/i)).toBeTruthy();
    expect(screen.getAllByTestId('ModuleBox-icon')).toHaveLength(3);
  });
});
