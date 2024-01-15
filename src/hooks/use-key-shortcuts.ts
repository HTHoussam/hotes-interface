import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const keysUrl: {
  [key: string]: string;
} = {
  a: '/administration',
  b: '/create-case',
  m: '/management',
  q: '/public-admin',
  d: '/import-error',
  t: '/import-new-cases',
  f: '/attachments',
  // c: '/accounting',
  n: '/records',
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
