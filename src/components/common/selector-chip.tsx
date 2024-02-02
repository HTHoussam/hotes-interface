import { faker } from '@faker-js/faker';
import { Autocomplete, Box, Chip, TextField, Typography } from '@mui/material';
import { X } from 'react-bootstrap-icons';

const SelectorChip = () => {
  const options: { title: string; value: string }[] = Array.from({ length: 4 }, () => {
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
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
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
