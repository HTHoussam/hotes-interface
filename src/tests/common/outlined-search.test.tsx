import { OutlinedSearchTextField } from '@/components/common';
import { render, screen } from '@/configs/test-utils';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { describe, expect, it } from 'vitest';

describe('test <OutlinedSearchTextField/>', () => {
  it('should render correctly', () => {
    render(
      <OutlinedSearchTextField
        type="search"
        InputProps={{
          startAdornment: <SearchOutlinedIcon />,
        }}
        label=""
        variant="standard"
        placeholder="Sok..."
      />,
    );
    expect(screen.getByRole('searchbox')).toBeTruthy();
    expect(screen.getByTestId('SearchOutlinedIcon')).toBeTruthy();
  });
});
