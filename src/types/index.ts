import { ReactNode } from 'react';

export type KK2Module = {
  name: string;
  icon: ReactNode | string;
  url: string;
  description?: string;
};

export enum FlexType {
  largeGrid = 1,
  smallGRid = 2,
  flex = 3,
}

export type User = {
  id: string;
  name: string;
  email: string;
  customer: string;
};
