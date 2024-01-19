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
import { Link } from 'react-router-dom';

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
        link: '/administration',
        letterValue: '(A)',
      },
      {
        title: 'Create case manually',
        icon: <WrenchAdjustableCircle size={20} />,
        link: '/cases',
        letterValue: '(B)',
      },
      {
        title: 'response management',
        icon: <ChatDots size={20} />,
        link: '/management',
        letterValue: '(M)',
      },
      {
        title: 'Public360 administration',
        icon: <VectorPen size={20} />,
        link: '/public-360',
        letterValue: '(Q)',
      },
    ],
    sectionB: [
      {
        title: 'Import error',
        icon: <ExclamationTriangle size={20} />,
        link: '/import-error',
        letterValue: '(D)',
      },
      {
        title: 'Import of new cases',
        icon: <CloudArrowUp size={20} />,
        link: '/new-cases',
        letterValue: '(T)',
      },
      {
        title: 'Attachments & OCR',
        icon: <Link45deg size={20} />,
        link: '/attachments',
        letterValue: '(F)',
      },
    ],
    sectionC: [
      {
        title: 'Accounting Proposals',
        icon: <CalculatorFill size={20} />,
        link: '/accounting',
        letterValue: '(C)',
      },
      {
        title: 'Previously Recorded',
        icon: <BookmarkCheck size={20} />,
        link: '/recorded',
        letterValue: '(N)',
      },
      {
        title: 'See Your Proceedings',
        icon: <Eye size={20} />,
        link: '/proceedings',
        letterValue: '(L)',
      },
    ],
    sectionD: [
      {
        title: 'Deptors',
        icon: <PersonBadge size={20} />,
        link: '/deptors',
        letterValue: '(P)',
      },
      {
        title: 'User Support',
        icon: <Headset size={20} />,
        link: '/user-support',
        letterValue: '(S)',
      },
      {
        title: 'User Manual',
        icon: <People size={20} />,
        link: '/user-manual',
        letterValue: '(Y)',
      },
    ],
    sectionE: [
      {
        title: 'Go to Loans',
        icon: <Bank size={20} />,
        link: '/loans',
        letterValue: '(Z)',
      },
    ],
  };

  return Object.keys(navs).map((key) => (
    <Stack key={key} gap={2}>
      {navs[key].map(({ icon, letterValue, title, link }) => (
        <Stack
          key={`${letterValue}-${title}`}
          direction={'row'}
          justifyContent={'space-between'}
          sx={{
            cursor: 'pointer',
          }}
          minHeight={'1.5rem'}
        >
          <Stack
            flexDirection={'row'}
            gap={2}
            sx={{
              textWrap: 'nowrap',
              textTransform: 'capitalize',
            }}
            fontWeight={600}
          >
            {icon}
            {!isCollapsed && <Link to={link}>{title}</Link>}
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
