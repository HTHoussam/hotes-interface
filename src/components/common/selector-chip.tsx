import { StatusBGColorMapper, StatusColorMapper } from '@/libs/constants';
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
  styled,
} from '@mui/material';
import { SyntheticEvent, useCallback, useState } from 'react';
import { Search, X } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
export const renderOption = (
  option:
    | string
    | {
        title: string;
        value: string;
      },
) => {
  return typeof option === 'string' ? option : option.value;
};
interface SelectorChipProps {
  options: {
    title: string;
    value: string;
  }[];
  onChange: (
    values: (
      | string
      | {
          value: string;
          title: string;
        }
    )[],
  ) => void;
  statusesCounts: {
    [key: string]: number;
  };
  extraSX?: SxProps<Theme>;
}
const SelectorChip = ({ options, onChange, statusesCounts, extraSX }: SelectorChipProps) => {
  const { t } = useTranslation();
  const [selectedOptionsState, setSelectedOptionsState] = useState<
    (
      | {
          title: string;
          value: string;
        }
      | string
    )[]
  >([]);
  const allSelected = options.length === selectedOptionsState.length;

  const handleChange = useCallback(
    (
      _: SyntheticEvent<Element, Event>,
      selectedOptions: (
        | string
        | {
            title: string;
            value: string;
          }
      )[],
    ) => {
      setSelectedOptionsState(selectedOptions);
      onChange(selectedOptions);
    },
    [onChange],
  );
  return (
    <Autocomplete
      multiple
      freeSolo
      forcePopupIcon
      disableCloseOnSelect
      disableClearable={true}
      key={options.length}
      limitTags={2}
      id="multiple-limit-tags-9"
      options={options}
      size="small"
      fullWidth
      value={selectedOptionsState}
      onChange={handleChange}
      sx={{
        backgroundColor: 'white',
        maxWidth: '17.902rem',
        '& .MuiInputBase-root': {
          maxHeight: '5rem',
          paddingTop: '1px',
          paddingBottom: '1px',
        },
        ...extraSX,
      }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.title)}
      renderTags={(selected, getTagProps) => {
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'baseline' }}>
            {selected.map((item, index) => (
              <StyledChip
                {...getTagProps({ index })}
                status={renderOption(item).toLowerCase()}
                deleteIcon={<X color="black" size={15} />}
                onDelete={() => {
                  setSelectedOptionsState((prev) => prev.filter((r) => renderOption(r) !== renderOption(item)));
                  onChange(selectedOptionsState.filter((r) => renderOption(r) !== renderOption(item)));
                }}
                sx={{
                  '.MuiChip-label': {
                    paddingLeft: '4x',
                    paddingRight: '1px',
                    fontSize: '13px',
                  },
                }}
                size="small"
                key={renderOption(item)}
                label={`${renderOption(item)}(${statusesCounts[renderOption(item)]})`}
              />
            ))}
          </Box>
        );
      }}
      renderOption={(props, option) => {
        const r = selectedOptionsState.find((r) => renderOption(r) === renderOption(option));

        return (
          <ListItem
            {...props}
            key={renderOption(option)}
            sx={{
              height: '36px',
            }}
          >
            <ListItemButton
              role={undefined}
              dense
              sx={{
                gap: 1,
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              disableRipple
            >
              <ListItemIconChipStyle>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  size="small"
                  checked={Boolean(r)}
                  disableRipple
                  sx={{
                    padding: 0,
                  }}
                  inputProps={{ 'aria-labelledby': renderOption(option) }}
                />
              </ListItemIconChipStyle>
              <ListItemTextChipStyle id={renderOption(option)} primary={renderOption(option)} />
            </ListItemButton>
          </ListItem>
        );
      }}
      renderInput={({ inputProps, ...rest }) => (
        <TextField
          {...rest}
          size="small"
          sx={{
            textTransform: 'capitalize',
          }}
          inputProps={{
            ...inputProps,
            readOnly: true,
          }}
        />
      )}
      PaperComponent={(paperProps) => {
        const { children } = paperProps;
        return (
          <SelectDropDownPaper
            onMouseDown={(event) => event.preventDefault()}
            sx={{
              '& .MuiListItem-root:hover': {
                backgroundColor: 'rgba(231, 241, 255, 1)',
              },
            }}
          >
            <Stack gap={1} direction="column">
              <Stack direction="row" alignItems={'center'} p={0}>
                <Checkbox
                  disableRipple
                  sx={{
                    padding: 0,
                  }}
                  checked={allSelected}
                  onChange={() => {
                    setSelectedOptionsState(!allSelected ? options : []);
                  }}
                  name="all-selected"
                />
                <Typography>{t('home.data.common.generic.table.selectAll.title')}</Typography>
              </Stack>
              <TextField
                InputProps={{
                  endAdornment: <Search />,
                }}
                name={'search'}
                id="status-dropdown-search"
              />
            </Stack>
            <Box width={'100%'}>{children}</Box>
          </SelectDropDownPaper>
        );
      }}
    />
  );
};

export default SelectorChip;

const StyledChip = styled(Chip)<{ status: string }>(({ status }) => ({
  borderRadius: '4px',
  padding: '0.75rem 0.25rem',
  border: '1px solid gray',
  maxWidth: '6rem',
  backgroundColor: StatusBGColorMapper[status],
  fillOpacity: 0.3,
  color: StatusColorMapper[status],
  fontWeight: '400',
  fontSize: '16px',
}));

const SelectDropDownPaper = styled(Paper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  alignItems: 'flex-start',
  padding: '1.5rem 1rem 1rem 1rem',
  width: 'auto',
}));

const ListItemIconChipStyle = styled(ListItemIcon)(() => ({
  minWidth: '10px',
}));
const ListItemTextChipStyle = styled(ListItemText)(() => ({
  fontWeight: 700,
  fontSize: '16px',
}));
