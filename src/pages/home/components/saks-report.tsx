import { Box, Stack, TextField, Typography, styled } from '@mui/material';
import { InfoCircle } from 'react-bootstrap-icons';

const SaksReport = () => {
  return (
    <Stack gap={8}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} gap={'2rem'}>
        <InfoCircle size={50} />
        <Box
          sx={{
            maxWidth: '32rem',
            textWrap: 'wrap',
          }}
        >
          <Typography>
            Her kan du søke på beløpsgrenser og/eller spesifikke avdelinger (oppdragsgivere).Noen av disse rapportene
            kan inneholde mye data og kan ta litt tid å få generert og lastet inn i din nettleser.Disse rapportene er et
            "snap-shot" av hvilke saker som ligger i KK2, så disse rapportene kan derfor endre seg fra dag til dag.
          </Typography>
        </Box>
      </Stack>
      <GridContainer>
        <StyledInputStack>
          <Stack direction={'row'} gap={1}>
            <Typography>Belop fra</Typography>
            <TextField fullWidth />
          </Stack>
          <Stack direction={'row'} gap={1}>
            <Typography>Belop fra</Typography>
            <TextField fullWidth />
          </Stack>
          <Stack direction={'row'} gap={1}>
            <Typography>Belop fra</Typography>
            <TextField fullWidth />
          </Stack>
          <Stack direction={'row'} gap={1}>
            <Typography>Belop fra</Typography>
            <TextField fullWidth />
          </Stack>
        </StyledInputStack>
        <StyledInputStack>
          <Stack direction={'row'} gap={1}>
            <Typography>Belop fra</Typography>
            <TextField fullWidth />
          </Stack>
          <Stack direction={'row'} gap={1}>
            <Typography>Belop fra</Typography>
            <TextField fullWidth />
          </Stack>
          <Stack direction={'row'} gap={1}>
            <Typography>Belop fra</Typography>
            <TextField fullWidth />
          </Stack>
          <Stack direction={'row'} gap={1}>
            <Typography>Belop fra</Typography>
            <TextField fullWidth />
          </Stack>
        </StyledInputStack>
      </GridContainer>
    </Stack>
  );
};
export default SaksReport;
const GridContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto',
}));
const StyledInputStack = styled(Stack)(() => ({
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'flex-start',
}));
