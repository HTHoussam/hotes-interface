declare module FlagIconProps {
  export interface FlagIconProps extends ImgHTMLAttributes<HTMLImageElement> {
    size?: number;
    code: FlagIconCode;
  }
}
