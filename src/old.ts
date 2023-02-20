import './main.css';

import { Temporal } from '@js-temporal/polyfill';
import {
  get as DBGet,
  set as DBSet,
} from 'idb-keyval';

interface ChartDBEntrySchedule {
  title: string;
  description: string;
  expectationsMet: boolean[];
}

interface ChartDBEntry {
  date: string;
  expectations: string[];
  consequences: string[];
  rewards: string[];
  schedule: ChartDBEntrySchedule[];
}

const today = Temporal.Now.plainDateISO();
const todayString = `${today.year}-${today.month.toString().padStart(2, '0')}-${today.day.toString().padStart(2, '0')}`;

const generateBlankEntry = () => {
  return <ChartDBEntry>{
    date: todayString,
    expectations: [],
    consequences: [],
    rewards: [],
    schedule: [],
  };
};

const injectExpectationsToDOM = (expectations: string[]) => {
  const target = document.getElementById('expectations');

  if (!target) throw new Error('Could not find expectations element.');

  expectations.forEach((expectation) => {
    const li = document.createElement('li');

    li.textContent = expectation;
    target.appendChild(li);
  });
};

const injectDateToDOM = (date: string) => {
  const target = document.getElementById('title-date');
  const formattedDate = Temporal.PlainDate.from(date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  if (!target) throw new Error('Could not find title-date element.');

  target.textContent = formattedDate;
}

const main = async () => {
  let data = await DBGet<ChartDBEntry>(todayString);

  if (!data) {
    const blankEntry = generateBlankEntry();

    await DBSet(todayString, blankEntry);

    data = blankEntry;
  }

  injectDateToDOM(data.date);
  injectExpectationsToDOM(data.expectations);
};

main();
