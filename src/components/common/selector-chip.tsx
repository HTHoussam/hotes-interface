import { faker } from '@faker-js/faker';
import { Autocomplete, Box, Chip, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { X } from 'react-bootstrap-icons';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const SelectorChip = () => {
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const options = Array.from({ length: 4 }, (_, index) => {
    const r = faker.word.sample();
    return {
      title: r,
      value: r,
    };
  });
  return (
    <Autocomplete
      multiple
      disableClearable
      freeSolo
      limitTags={2}
      id="multiple-limit-tags"
      options={options}
      sx={{ width: '300px' }}
      getOptionLabel={(option) => option.title}
      renderTags={(selected, getTagProps) => {
        const numTags = selected.length;
        const limitTags = 2;

        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'baseline' }}>
            {selected.slice(0, limitTags).map(({ title, value }, index) => (
              <Chip
                {...getTagProps({ index })}
                sx={{
                  borderRadius: '4px',
                  padding: '0.75rem 0.25rem',
                  border: '1px solid gray',
                  maxWidth: '6rem',
                }}
                deleteIcon={<X color="black" size={20} />}
                onDelete={() => {
                  console.log('dkekmdek');
                }}
                size="small"
                key={value}
                label={title}
              />
            ))}
            <Typography>{numTags > limitTags && ` +${numTags - limitTags}`}</Typography>
          </Box>
        );
      }}
      renderInput={({ inputProps, ...rest }) => (
        <TextField
          {...rest}
          inputProps={{
            ...inputProps,
            readOnly: true,
          }}
          label="TEST"
        />
      )}
    />
  );
};
export default SelectorChip;
