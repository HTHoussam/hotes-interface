import type {} from '@mui/lab/themeAugmentation';
import { Theme, ThemeOptions } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';

declare module '@mui/material/styles' {
  interface CustomTheme extends Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface Palette extends Palette {
    whitey?: Palette['primary'];
  }
  interface PaletteOptions extends PaletteOptions {
    whitey?: PaletteOptions['primary'];
  }
  interface CustomThemeOptions extends ThemeOptions {
    status?: {
      danger?: string;
    };
  }
  interface ComponentsVariants {
    MuiTabPanel: Components<Omit<Theme, 'components'>>;
  }
  interface ComponentsVariantsOptions {
    MuiTabPanel?: Components<Omit<Theme, 'components'>>;
  }
  interface TypographyVariants {
    boldtext: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    boldtext?: React.CSSProperties;
    normalText?: React.CSSProperties;
    boldGreyText?: React.CSSProperties;
    boldBigText?: React.CSSProperties;
  }
  interface TextFieldPropsVariantOverrides {
    outlinedWhite: true;
  }
  interface OutlinedTextFieldProps extends OutlinedTextFieldProps {
    variant: 'outlinedWhite';
  }
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
declare module '@material-ui/core/styles/createPalette' {}
