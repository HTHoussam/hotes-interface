import { OutlinedSearchTextField } from '@/components/common';
import { useGlobalSearchStore } from '@/stores/variables-store';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChangeEvent, useCallback } from 'react';

const GlobalSearch = () => {
  const { setSearchTerm } = useGlobalSearchStore();
  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = event.target.value.trim(); // Remove leading and trailing whitespaces

      inputValue !== undefined && inputValue !== null && inputValue !== ''
        ? setSearchTerm(inputValue)
        : setSearchTerm('');
    },
    [setSearchTerm],
  );
  return (
    <OutlinedSearchTextField
      type="search"
      InputProps={{
        startAdornment: <SearchOutlinedIcon />,
      }}
      sx={{
        width: '100%',
        maxWidth: '17rem',
      }}
      label=""
      variant="standard"
      placeholder="Sok..."
      onChange={handleTextChange}
    />
  );
};
export default GlobalSearch;
