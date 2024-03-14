import { Dayjs } from 'dayjs';
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

export interface OverviewDetail {
  id: number;
  name: string;
  case: number;
  status: string;
  lastAction: string;
  dateForAction: Dayjs;
  principalAmount: number;
  cost: number;
  fee: number;
  interest: number;
  paid: number;
  balance: number;
  caseManager: string;
}

export interface Widget {
  title: string;
  description: string;
  id: string;
  actions: boolean;
}
