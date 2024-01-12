import { render, screen } from '@/configs/test-utils';
import ModuleListFlex from '@/pages/home/components/module-list-flex';
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
describe('test <ModuleListFlex/>', () => {
  it('should render correctly', () => {
    render(<ModuleListFlex items={mockList} />);
    expect(screen.findByTestId('tools-icon')).toBeTruthy();
    expect(screen.findByTestId('people-icon')).toBeTruthy();
  });
});
