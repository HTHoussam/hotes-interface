import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';
import {
  Bank,
  BookmarkCheck,
  CalculatorFill,
  ChatDots,
  CloudArrowUp,
  ExclamationTriangle,
  Eye,
  Headset,
  Link45deg,
  People,
  PersonBadge,
  Shield,
  VectorPen,
  WrenchAdjustableCircle,
} from 'react-bootstrap-icons';

const NavLinks = ({ isCollapsed }: { isCollapsed?: boolean }) => {
  const navs: {
    [key: string]: Array<{
      title: string;
      icon: ReactNode;
      link: string;
      letterValue: string;
    }>;
  } = {
    sectionA: [
      {
        title: 'administration',
        icon: <Shield size={20} />,
        link: '',
        letterValue: '(A)',
      },
      {
        title: 'Create case manually',
        icon: <WrenchAdjustableCircle size={20} />,
        link: '',
        letterValue: '(B)',
      },
      {
        title: 'response management',
        icon: <ChatDots size={20} />,
        link: '',
        letterValue: '(M)',
      },
      {
        title: 'Public360 administration',
        icon: <VectorPen size={20} />,
        link: '',
        letterValue: '(Q)',
      },
    ],
    sectionB: [
      {
        title: 'Import error - WIP',
        icon: <ExclamationTriangle size={20} />,
        link: '',
        letterValue: '(D)',
      },
      {
        title: 'Import of new cases',
        icon: <CloudArrowUp size={20} />,
        link: '',
        letterValue: '(T)',
      },
      {
        title: 'Attachments & OCR',
        icon: <Link45deg size={20} />,
        link: '',
        letterValue: '(F)',
      },
    ],
    sectionC: [
      {
        title: 'Accounting Proposals',
        icon: <CalculatorFill size={20} />,
        link: '',
        letterValue: '(C)',
      },
      {
        title: 'Previously Recorded',
        icon: <BookmarkCheck size={20} />,
        link: '',
        letterValue: '(N)',
      },
      {
        title: 'See Your Proceedings',
        icon: <Eye size={20} />,
        link: '',
        letterValue: '(L)',
      },
    ],
    sectionD: [
      {
        title: 'Deptors',
        icon: <PersonBadge size={20} />,
        link: '',
        letterValue: '(P)',
      },
      {
        title: 'User Support',
        icon: <Headset size={20} />,
        link: '',
        letterValue: '(S)',
      },
      {
        title: 'User Manual',
        icon: <People size={20} />,
        link: '',
        letterValue: '(Y)',
      },
    ],
    sectionE: [
      {
        title: 'Go to Loans',
        icon: <Bank size={20} />,
        link: '',
        letterValue: '(Z)',
      },
    ],
  };

  return Object.keys(navs).map((key) => (
    <Stack key={key} gap={2}>
      {navs[key].map(({ icon, letterValue, title }) => (
        <Stack key={`${letterValue}-${title}`} direction={'row'} justifyContent={'space-between'} minHeight={'1.5rem'}>
          <Stack
            flexDirection={'row'}
            gap={2}
            sx={{
              textWrap: 'nowrap',
            }}
            fontWeight={600}
          >
            {icon}
            {!isCollapsed && <Box textTransform={'capitalize'}>{title}</Box>}
          </Stack>
          <Box fontSize={'14'} fontWeight={'300'}>
            {letterValue}
          </Box>
        </Stack>
      ))}
    </Stack>
  ));
};

export default NavLinks;
