type Nullable<T> = T | null;

interface ChartDBEntrySchedule {
  title: string;
  description: string;
  expectationsMet: boolean[];
}

interface ChartDBTopColumn {
  title: string;
  items: string[];
}

interface ChartDBEntry {
  date: string;
  title: string;
  topColumns: ChartDBTopColumn[];
  expectations: string[];
  consequences: string[];
  rewards: string[];
  schedule: ChartDBEntrySchedule[];
  totals: number[];
  misc: string[];
}
