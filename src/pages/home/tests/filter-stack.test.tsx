import { render, screen } from '@/configs/test-utils';
import { describe, expect, it } from 'vitest';

import FilterStack from '../components/filter-stack';
const mockHotels = [
  {
    id: 1,
    name: 'Sunset Inn',
    location: 'Beachfront Avenue',
    rooms: 50,
    description: 'A cozy beachfront hotel offering breathtaking sunset views.',
    href: 'https://www.sunsetinn.com',
    availableRooms: 14,
    image:
      'https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Mountain View Lodge',
    location: 'Alpine Way',
    rooms: 25,
    availableRooms: 5,
    description: 'Experience the serenity of the mountains at Mountain View Lodge.',
    href: 'https://www.mountainviewlodge.com',
    image:
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
describe('test <FirstCardTitle/>', () => {
  it('should render correctly', () => {
    render(<FilterStack fetchedHotels={mockHotels} />);
    expect(screen.getByText(/pick your dates:/i)).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: /from/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /find prices/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/pick your dates:/i)).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', {
        name: /to/i,
      }),
    ).toBeInTheDocument();

    screen.logTestingPlaygroundURL();
  });
});
