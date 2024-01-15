import { useGetCustomers } from '@/apis/customer/queries';
import { OutlinedSelect } from '@/components/common/styled-components';
import { MenuItem } from '@mui/material';
import { useMemo, useState } from 'react';

const SelectCustomers = () => {
  const { data: fetchedCustomers } = useGetCustomers();
  const customers = useMemo(() => {
    if (!fetchedCustomers) return [];

    return fetchedCustomers;
  }, [fetchedCustomers]);

  const [selectedCustomer, setSelectedCustomer] = useState('customer1');
  return (
    <OutlinedSelect
      data-testid="customer-selector"
      value={selectedCustomer}
      sx={{
        color: 'white',
        borderColor: 'white',
        width: '17rem',
        marginRight: '15rem',
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: '30rem',
            width: '17rem',
          },
        },
      }}
      onChange={(event) => {
        setSelectedCustomer(event.target.value as string);
      }}
    >
      {customers.map(({ name, id }) => (
        <MenuItem key={id} value="customer1">
          {name}
        </MenuItem>
      ))}
    </OutlinedSelect>
  );
};
export default SelectCustomers;
