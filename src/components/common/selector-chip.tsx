import { faker } from '@faker-js/faker';
import { Autocomplete, Box, Chip, TextField, Typography, styled } from '@mui/material';
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
              <StyledChip
                {...getTagProps({ index })}
                index={index}
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

const StyledChip = styled(Chip)<{ index: number }>(({ index }) => ({
  borderRadius: '4px',
  padding: '0.75rem 0.25rem',
  border: '1px solid gray',
  maxWidth: '6rem',
  backgroundColor: index % 2 ? 'rgba(97, 190, 157, 0.3)' : 'rgba(248, 147, 30, 0.3)',
  color: index % 2 ? 'rgba(97, 190, 157, 1)' : 'rgba(248, 147, 30, 1)',
  fontWeight: '400',
  fontSize: '16px',
}));
