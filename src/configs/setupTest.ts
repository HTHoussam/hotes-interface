import { i18n } from '@/locale/i18n';
import * as matchers from '@testing-library/jest-dom/matchers';

import { beforeEach, expect } from 'vitest';
/**
 * Add assertions methods for DOM elements such as 'toBeInTheDocument'
 */
expect.extend(matchers);
beforeEach(() => {
  i18n.init();
});
