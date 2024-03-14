import { useGetOverviews } from '@/apis/overview/queries';
import { MenuItem, Select } from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FolderSelect = memo(() => {
  const urlParams = useParams();
  const navigate = useNavigate();
  const { data: overviewData } = useGetOverviews();

  const options = useMemo(() => {
    if (!overviewData) return [];
    return overviewData.map((r) => r.title);
  }, [overviewData]);
  const [selectedValue, setSelectedValue] = useState(urlParams.element);

  useEffect(() => {
    if (urlParams?.element) {
      setSelectedValue(urlParams.element);
    }
  }, [urlParams.element]);

  return (
    <Select
      size="small"
      sx={{
        backgroundColor: 'white',
        textAlign: 'left',
      }}
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
        navigate(`/overview/${event.target.value}`);
      }}
    >
      {options.map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
});
export default FolderSelect;
