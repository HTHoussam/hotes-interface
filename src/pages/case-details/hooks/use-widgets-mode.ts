import { useContext } from 'react';
import { WidgetsModeContext } from '..';

export const useWidgetsMode = () => {
  return useContext(WidgetsModeContext);
};
