import { i18n } from '@/locale/i18n';
import matchers from '@testing-library/jest-dom/matchers';

import { beforeEach, expect } from 'vitest';

expect.extend(matchers);
beforeEach(() => {
  i18n.init();
});
