import { SecondaryDropDown } from '@/components/common';
import { Button, Stack, styled } from '@mui/material';

const TiltakActionsButton = () => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        gap: 2,
      }}
    >
      <StyledButton>PUR</StyledButton>
      <StyledButton>418</StyledButton>
      <StyledButton
        sx={{
          minWidth: '6rem',
        }}
      >
        Dok.Pakke
      </StyledButton>

      <SecondaryDropDown
        options={[
          {
            value: 'Festesalg',
            label: 'Festesalg',
          },
        ]}
        title={'Festesalg'}
        handleChange={() => {}}
        value={'Festesalg'}
      />
    </Stack>
  );
};
export default TiltakActionsButton;
const StyledButton = styled(Button)(() => ({
  size: 'small',
  width: 'fit-content',
}));
