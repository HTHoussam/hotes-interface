import { FlagIconCode } from 'react-flag-kit';

export const languages: { label: string; id: string; code: FlagIconCode }[] = [
  { label: 'English', id: 'en', code: 'US' },
  { label: 'Norwegian', id: 'no', code: 'NO' },
];

export const StatusColorMapper: { [key: string]: string } = {
  active: 'rgba(97, 190, 157, 1)',
  inactive: 'rgba(225, 0, 0, 1)',
  pending: 'rgba(248, 147, 30, 1)',
  closed: 'black',
};
export const StatusBGColorMapper: { [key: string]: string } = {
  active: 'rgba(97, 190, 157, 0.3)',
  inactive: 'rgba(225, 0, 0, 0.3)',
  pending: 'rgba(248, 147, 30, 0.3)',
  closed: 'rgba(243, 244, 247, 1)',
};

export const BlueScrollBarOverride = {
  '::-webkit-scrollbar': {
    '--thumb-thickness': '0.55rem',
    backgroundColor: 'rgba(217, 217, 217, 1) !important',
    width: '0.55rem',
    height: '0.55rem',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(217, 217, 217, 1) !important',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(1, 16, 67, 1)',
    borderRadius: ' 1rem',
    transition: ' box-shadow 300ms ease',
    boxShadow: 'none',
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(1, 16, 67, 1)',
  },
  ':hover::-webkit-scrollbar-thumb': {
    boxShadow: 'none',
  },
};

export const calendarCategories = ['Inkasso-varsel', 'Betalings-oppfordring', '4-18 varsel', 'Avdrag', 'Notatere'];
export const calendarStatuses = ['active', 'inactive', 'pending', 'closed'];
