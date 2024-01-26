import { render, screen } from '@/configs/test-utils';
import { describe, expect, it } from 'vitest';
import { LanguageSelector } from '..';

describe('test <AvatarUpload/>', () => {
  it('should render correctly', () => {
    render(<LanguageSelector />);
    expect(
      screen.getByRole('textbox', {
        hidden: true,
      }),
    ).toBeTruthy();
  });
});
