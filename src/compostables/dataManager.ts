export const generateEmptyScheduleEntry = () => (<ChartDBEntrySchedule>{
  title: '',
  description: '',
  expectationsMet: [
    null,
    null,
    null,
  ],
});

export const generateEmptyDBEntry = (dateString: string) => (<ChartDBEntry>{
  title: 'Star Chart',
  date: dateString,
  topColumns: [
    { title: 'My Expectations', items: ['Follow instructions the first time', 'Keep hands, feet, and other objects to self', 'Do my work and try my best'] },
    { title: 'My Consequences', items: ['Reminder/Warning', 'Reflection of Behavior', 'Loss of Reward'] },
    { title: 'My Rewards', items: ['', '', ''] },
  ],
  schedule: [
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
    generateEmptyScheduleEntry(),
  ],
  totals: ['', ''],
  misc: ['', ''],
});
