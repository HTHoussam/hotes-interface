export interface Innbetalinger {
  id: number;
  dato: string;
  saksbehandler: string;
  registrert: string;
  betalt: string;
  hovudstol: string;
  salær_omkostnader: string;
  renter: string;
  bokført: string;
  tekst: string;
}

export interface NotaterType {
  id: number;
  dato: string;
  notat: string;
  forfall: string;
}

export interface SakerDebitorType {
  id: number;
  sak: string;
  status: string;
  avd: string;
  saldo: string;
  avsluttet: string;
}

export interface RedigerDeptorType {
  id: number;
  debitornr: string;
  personOrg: string;
  navn: string;
  postAdresse: string;
  postNumber: string;
  mobileTelefon: string;
  epost: string;
  note: string;
}

export interface FordringerType {
  id: number;
  number: string;
  date: string;
  forfall: string;
  foreldes: string;
  belop: string;
  kravet: string;
  pdf: boolean;
}

export interface WidgetsMapType {
  component: JSX.Element;
  isInLayout: boolean;
  title?: string;
  icon?: JSX.Element;
  widgetId: string;
}
