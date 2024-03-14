export interface CalendarDataRow {
  categoryName: string;
  data: {
    [key: string]: Case[];
  };
}

export interface WorkingDay {
  date: string;
  isWeekend: boolean;
}

export interface Case {
  caseNumber: number;
  status: string;
}
