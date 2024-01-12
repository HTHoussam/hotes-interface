import { render } from '@/configs/test-utils';
import { PlaceHolderModule } from '@/pages/home/components';
import { FlexType } from '@/types';
import { describe, it } from 'vitest';

describe('test <placeHolderModule/>', () => {
  it('should render correctly', () => {
    render(<PlaceHolderModule gridType={FlexType.largeGrid} />);
  });
});
