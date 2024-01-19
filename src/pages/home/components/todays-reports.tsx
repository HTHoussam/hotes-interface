import { ModalWrapper, StackedDataRows } from '@/components/common';
import { Box, Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FirstCardTitle, SaksReport } from '.';
import PrincipalChart from './principal-chart';

const TodaysReports = ({ data }: { data: { title: string; value: string; href: string }[] }) => {
  const { t } = useTranslation();
  const [openReportModal, setOpenReportModal] = useState(false);
  const handleOpenReportModal = useCallback((val: boolean) => {
    setOpenReportModal(val);
  }, []);
  return (
    <Stack>
      <FirstCardTitle setOpenReportModal={setOpenReportModal} title={'Paid Amount Last 12 Months'} />
      <Box
        sx={{
          margintTop: '2rem',
          height: '300px',
        }}
      >
        <PrincipalChart />
      </Box>
      <StackedDataRows data={data} />
      <ModalWrapper
        open={openReportModal}
        handleOpenState={handleOpenReportModal}
        modalWidth={'1040px'}
        modalHeight={'584px'}
        title={t('home.report.modal.title')}
        actionStack={undefined}
      >
        <Stack>
          <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title={t('home.report.modal.first.tab.title')}>
              <SaksReport />
            </Tab>
            <Tab eventKey="profile" title={t('home.report.modal.second.tab.title')}>
              Tab content for Profile
            </Tab>
          </Tabs>
        </Stack>
      </ModalWrapper>
    </Stack>
  );
};
export default TodaysReports;