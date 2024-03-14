import { CircleIcon, InvertColorCard, SelectorChip } from '@/components/common';
import { renderOption } from '@/components/common/selector-chip';
import useIsMobile from '@/hooks/useIsMobile';
import { useOverviewFilterStore } from '@/stores/overview-filters-store';
import { Box, Stack } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Folder2Open } from 'react-bootstrap-icons';
import FolderSelect from './folder-select';

const FolderCard = ({
  statuses,
  statusesCounts,
}: {
  statuses: string[];
  statusesCounts: {
    [key: string]: number;
  };
}) => {
  const { setFilterModel, filterModel } = useOverviewFilterStore();

  const options: { title: string; value: string }[] = useMemo(() => {
    return statuses.map((r) => ({
      title: r,
      value: r,
    }));
  }, [statuses]);
  const handleFilterChange = useCallback((values: (string | { value: string; title: string })[]) => {
    setFilterModel({
      ...filterModel,
      items: [
        ...(filterModel?.items ?? []),
        {
          field: 'status',
          operator: 'isAnyOf',
          value: values.map((r) => renderOption(r)),
        },
      ],
    });
  }, []);

  const { isMobile } = useIsMobile();
  return (
    <InvertColorCard
      width={'431px'}
      style={{
        paddingBlock: 0,
      }}
      invertedcolor={false}
    >
      <Box
        fontWeight={'400'}
        sx={{
          p: '1rem',
          width: '100%',
          minWidth: isMobile ? '150px' : '355px',
        }}
      >
        <Stack direction={'row'} gap={4}>
          {!isMobile && (
            <Stack direction={'row'} alignItems={'center'} flex={1}>
              <CircleIcon color="#011043">
                <Folder2Open size={34} color="white" />
              </CircleIcon>
            </Stack>
          )}
          <Stack
            sx={{
              flexDirection: 'column',
              gap: 2,
            }}
            flex={6}
          >
            <FolderSelect />
            <SelectorChip statusesCounts={statusesCounts} options={options} onChange={handleFilterChange} />
          </Stack>
        </Stack>
      </Box>
    </InvertColorCard>
  );
};
export default FolderCard;
