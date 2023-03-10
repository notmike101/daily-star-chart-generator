/// <reference types="vite-svg-loader" />

type Nullable<T> = T | null;

interface ChartDBEntrySchedule {
  title: string;
  description: string;
  expectationsMet: Nullable<boolean>[];
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
  totals: [string, string];
  misc: string[];
}
