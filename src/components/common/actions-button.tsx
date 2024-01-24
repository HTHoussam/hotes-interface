import { Button, Stack } from '@mui/material';

interface ActionsButtonProps {
  handleDiscard: () => void;
  formId: string;
  discardTitle: string;
  submitTitle: string;
}
const ActionsButton = ({ handleDiscard, formId, discardTitle, submitTitle }: ActionsButtonProps) => {
  return (
    <Stack
      sx={{
        flexDirection: 'row',
        gap: 2,
        marginLeft: 'auto',
        maringTop: '2rem',
      }}
    >
      <Button onClick={handleDiscard} color="secondary">
        {discardTitle}
      </Button>
      <Button type="submit" form={formId}>
        {submitTitle}
      </Button>
    </Stack>
  );
};
export default ActionsButton;
