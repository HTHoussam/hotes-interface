import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const keysUrl: {
  [key: string]: string;
} = {
  a: '/administration',
  b: '/cases',
  m: '/management',
  q: '/public-360',
  d: '/import-error',
  t: '/new-cases',
  f: '/attachments',
  // c: '/accounting',
  n: '/recorded',
  l: '/proceedings',
  p: '/deptors',
  s: '/user-support',
  y: '/user-manual',
  z: '/loans',
};
export const useKeyShortcuts = () => {
  const navigate = useNavigate();
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const isInputOrTextArea = ['INPUT', 'TEXTAREA'].includes((event.target as Element).tagName);

      if (isInputOrTextArea) {
        return;
      }
      navigate(keysUrl[event.key.toLowerCase()]);
    },
    [navigate],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return {};
};
