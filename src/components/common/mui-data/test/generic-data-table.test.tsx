import { render } from '@/configs/test-utils';
import { describe, it } from 'vitest';
import { GenericDataTable } from '..';

describe('test <GenericDataTable/>', () => {
  it('should render correctly', () => {
    render(<GenericDataTable />);
  });
});
