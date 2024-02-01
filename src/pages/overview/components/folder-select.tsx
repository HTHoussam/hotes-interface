import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const FolderSelect = () => {
  const options = ['value1', 'value2', 'value3', 'value4', 'value5'];
  const [selectedValue, setSelectedValue] = useState(options[0]);
  return (
    <Select
      size="small"
      MenuProps={{
        autoFocus: false,
        sx: {
          maxWidth: 'fit-content',
          '.MuiPaper-root': {
            overflow: 'auto',
            maxHeight: '11rem',
            scrollBehavior: 'smooth',
          },
        },
      }}
      value={selectedValue}
      onChange={(event) => {
        setSelectedValue(event.target.value);
      }}
    >
      {options.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};
export default FolderSelect;
