import { render, screen } from '@/configs/test-utils';
import { describe, expect, it } from 'vitest';
import AvatarUpload from '../avatar-upload';

describe('test <AvatarUpload/>', () => {
  it('should render correctly', () => {
    render(<AvatarUpload />);
    expect(screen.getByTestId('PhotoCameraIcon'));
    expect(screen.getByText(/click the image to change it/i)).toBeTruthy();
  });
});
