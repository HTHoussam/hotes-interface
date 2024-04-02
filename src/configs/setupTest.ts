import { i18n } from '@/locale/i18n';
import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';

beforeEach(() => {
  i18n.init();
});
