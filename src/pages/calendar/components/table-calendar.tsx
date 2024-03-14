import { EllipseShape } from '@/components/common';
import { StatusColorMapper } from '@/libs/constants';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { ArrowLeftCircleFill, ArrowRightCircleFill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { CalendarDataRow, WorkingDay } from '../types';

interface TableCalendarProps {
  rows: CalendarDataRow[];
  workingDays: WorkingDay[];
  handleExtendedCasesKey: (val: { date: string; category: string }) => void;
}
const TableCalendar = ({ rows, workingDays, handleExtendedCasesKey }: TableCalendarProps) => {
  const { t } = useTranslation();
  const [columnScrollIdx, setColumnScrollIdx] = useState({
    startIdx: 0,
    endIdx: 8,
  });
  const [showSeeAll, setShowSeeAll] = useState<{
    [key: string]: boolean;
  }>({});

  const renderHeaders = useMemo(() => {
    const renderedHeadersTemp: JSX.Element[] = [];
    workingDays.slice(columnScrollIdx.startIdx, columnScrollIdx.endIdx).forEach((day, index, elements) => {
      if (index + 1 <= workingDays.length - 1 && day.isWeekend && elements[index + 1]?.isWeekend) {
        return;
      }
      renderedHeadersTemp.push(
        <StyledTableCellBold
          sx={{
            maxWidth: day.isWeekend ? '1rem' : '2rem',
          }}
          key={day.date}
        >
          {day.isWeekend ? 'helg' : day.date}
        </StyledTableCellBold>,
      );
    });
    return renderedHeadersTemp;
  }, [columnScrollIdx.endIdx, columnScrollIdx.startIdx, workingDays]);

  return (
    <TableContainer
      sx={{
        '& .MuiTableRow-root:last-child td,.MuiTableRow-root:last-child th': {
          border: '1px solid black',
        },
      }}
      component={StyledCalendarPaper}
    >
      <Stack
        sx={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <SyledIconButton
          onClick={() => {
            setColumnScrollIdx((prev) => {
              return {
                startIdx: prev.startIdx - 2,
                endIdx: prev.endIdx - 2,
              };
            });
          }}
          disabled={columnScrollIdx.startIdx === 0}
        >
          <ArrowLeftCircleFill size={25} />
        </SyledIconButton>
        <SyledIconButton
          onClick={() => {
            setColumnScrollIdx((prev) => {
              return {
                startIdx: prev.startIdx + 2,
                endIdx: prev.endIdx + 2,
              };
            });
          }}
          disabled={columnScrollIdx.endIdx >= workingDays.length}
        >
          <ArrowRightCircleFill size={25} />
        </SyledIconButton>
      </Stack>
      <Table sx={{ minWidth: 650, tableLayout: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCellBold>{t('calendar.page.header.title')}</StyledTableCellBold>
            {renderHeaders}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.categoryName}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <StyledTableCellBold
                sx={{
                  maxWidth: '2.5rem',
                }}
                variant="head"
                component="th"
                scope="row"
              >
                {row.categoryName}
              </StyledTableCellBold>
              {workingDays
                .slice(columnScrollIdx.startIdx, columnScrollIdx.endIdx)
                .map(({ date, isWeekend }, index, elements) => {
                  row.data[date].sort((a, b) => a.caseNumber - b.caseNumber);
                  const dataArray = row.data[date].length > 5 ? row.data[date].slice(0, 5) : row.data[date];
                  if (
                    index + 1 <= workingDays.slice(columnScrollIdx.startIdx, columnScrollIdx.endIdx).length - 1 &&
                    isWeekend &&
                    elements[index + 1]?.isWeekend
                  ) {
                    return;
                  }
                  return (
                    <StyledTableCell
                      sx={{
                        backgroundColor: isWeekend ? 'rgba(217, 217, 217, 0.54)' : 'white',
                        width: isWeekend ? 100 : 160,
                        height: 120,
                        ...(isWeekend
                          ? {
                              maxWidth: '0.5rem',
                            }
                          : {}),
                      }}
                      onMouseEnter={() => {
                        setShowSeeAll((prev) => ({
                          ...prev,
                          [`${row.categoryName}-${date}`]: true,
                        }));
                      }}
                      onMouseLeave={() => {
                        setShowSeeAll((prev) => ({
                          ...prev,
                          [`${row.categoryName}-${date}`]: false,
                        }));
                      }}
                      key={date}
                      component="td"
                      scope="row"
                    >
                      <ChipsStack direction="column" gap={0.5}>
                        {dataArray.map(({ caseNumber, status }) => (
                          <Stack
                            direction="row"
                            key={`${caseNumber}-${status}`}
                            gap={1}
                            alignItems={'center'}
                            width={'100%'}
                            onClick={() => {}}
                          >
                            <EllipseShape
                              height={'9px'}
                              width={'9px'}
                              sx={{
                                backgroundColor: StatusColorMapper[status],
                              }}
                            />
                            <Typography
                              sx={{
                                flex: 1,
                              }}
                            >
                              Case {caseNumber}
                            </Typography>
                          </Stack>
                        ))}
                        {row.data[date].length > 5 && !isWeekend && showSeeAll[`${row.categoryName}-${date}`] && (
                          <SeeAllBox
                            onClick={() => {
                              handleExtendedCasesKey({
                                category: row.categoryName,
                                date: date,
                              });
                            }}
                            key={`${date}.${row.categoryName}.seeall`}
                          >
                            {t('common.text.see.all')}
                          </SeeAllBox>
                        )}
                      </ChipsStack>
                    </StyledTableCell>
                  );
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableCalendar;

const StyledCalendarPaper = styled(Paper)(() => ({
  boxShadow: 'none',
  borderRadius: 0,
  flex: 1,
  minWidth: 650,
}));

const StyledTableCell = styled(TableCell)(() => ({
  border: '1px solid black',
  position: 'relative',
  padding: '6px',
  maxWidth: '2.5rem',
  borderRight: '1px solid black',
  borderTop: '1px solid black',
}));

const StyledTableCellBold = styled(TableCell)(() => ({
  border: '1px solid black',
  fontWeight: 600,
  fontSize: '15px',
  padding: '6px',
  maxWidth: '2rem',
  width: '1rem',
  backgroundColor: 'rgba(238, 239, 240, 1)',
  textAlign: 'center',
}));

const ChipsStack = styled(Stack)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
}));

const SeeAllBox = styled(Box)(() => ({
  position: 'absolute',
  backgroundColor: 'rgba(1, 16, 67, 0.65)',
  width: '100%',
  textAlign: 'center',
  padding: '1px',
  height: '22px',
  bottom: 0,
  color: 'whitesmoke',
  cursor: 'pointer',
  pointerEvents: 'visible',
}));

const SyledIconButton = styled(IconButton)(() => ({
  transition: 'all 1s ease-in-out',
  transform: 'scale(1)',
  ':hover': {
    transform: 'scale(1.2)',
  },
}));
