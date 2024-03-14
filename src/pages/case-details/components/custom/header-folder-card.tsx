import { CircleIcon, InvertColorCard } from '@/components/common';
import { Box, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { FolderCheck } from 'react-bootstrap-icons';
import CaseDetailsNumbers from './case-details-numbers';

const HeaderFolderCard = ({
  data,
  idsData,
}: {
  data: { title: string; value: number }[];
  idsData: { title: string; value: number }[];
}) => {
  const options = ['value1', 'value2', 'value3', 'value4'];
  const [selectedOption, setSelectedOption] = useState(options[0] ?? '');

  return (
    <InvertColorCard
      sx={{
        height: '100%',
        flexDirection: 'row',
        gap: '1.3rem',
        padding: '1rem 1rem',
        alignItems: 'flex-start',
        flex: 1,
      }}
    >
      <Box>
        <CircleIcon color={'rgba(25, 135, 84, 1)'}>
          <FolderCheck size={34} color="white" />
        </CircleIcon>
      </Box>
      <Stack
        sx={{
          flex: 1,
          gap: 1,
        }}
      >
        <Box>
          <Typography textOverflow={'ellipsis'} fontSize={13} fontWeight={500}>
            Oppstilling sak: 0219-00008294
          </Typography>
          <Typography textOverflow={'ellipsis'} fontSize={13} fontWeight={500}>
            Saksbehandler: Terabyte test
          </Typography>
          <Typography textOverflow={'ellipsis'} fontSize={13} fontWeight={500}>
            Valuta: USD
          </Typography>
        </Box>

        <Select
          size="small"
          value={selectedOption}
          sx={{
            maxWidth: '15rem',
            backgroundColor: 'white',
          }}
          MenuProps={{
            slotProps: {
              paper: {
                sx: {
                  width: 'fit-content',
                },
              },
            },
          }}
          onChange={(event) => {
            setSelectedOption(event.target.value);
          }}
        >
          {options.map((op) => (
            <MenuItem key={op} value={op}>
              {op}
            </MenuItem>
          ))}
        </Select>
        <Box
          sx={{
            marginTop: '3rem',
          }}
        >
          {idsData.map(({ title, value }) => (
            <Stack
              key={title}
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography fontWeight={600} fontSize={'12px'}>
                {title}
              </Typography>
              <Typography fontWeight={600} fontSize={'16px'}>
                {value}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>

      <CaseDetailsNumbers data={data} />
    </InvertColorCard>
  );
};
export default HeaderFolderCard;
