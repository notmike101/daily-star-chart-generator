<script lang="ts" setup>
import { computed, ref, watch, toRaw } from 'vue'
import { get as dbGet, set as dbSet } from 'idb-keyval';
import { Temporal } from '@js-temporal/polyfill';

type Nullable<T> = T | null;

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

const activeDate = ref(Temporal.Now.plainDateISO());
const activeDateString = computed(() => `${activeDate.value.year}-${activeDate.value.month.toString().padStart(2, '0')}-${activeDate.value.day.toString().padStart(2, '0')}`);
const databaseEntry = ref<Nullable<ChartDBEntry>>(null);
const skipDatabaseEntryWatcher = ref(false);
const entryUpdateDelayTimeout = ref<number>();

const generateEmptyScheduleEntry = () => (<ChartDBEntrySchedule>{
  title: '',
  description: '',
  expectationsMet: [],
});

const generateEmptyDBEntry = () => (<ChartDBEntry>{
  date: activeDateString.value,
  expectations: [],
  consequences: [],
  rewards: [],
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
});

const activeDateWatcher = async (newDate: Temporal.PlainDate) => {
  let entry = await dbGet<ChartDBEntry>(`${newDate.year}-${newDate.month.toString().padStart(2, '0')}-${newDate.day.toString().padStart(2, '0')}`);

  if (!entry) {
    const newEntry = generateEmptyDBEntry();

    await dbSet(activeDateString.value, newEntry);

    entry = newEntry;
  }

  skipDatabaseEntryWatcher.value = true;
  databaseEntry.value = entry;
};

const databaseEntryWatcher = async (newEntry: Nullable<ChartDBEntry>) => {
  if (skipDatabaseEntryWatcher.value === true) {
    skipDatabaseEntryWatcher.value = false;
    return;
  }

  if (entryUpdateDelayTimeout !== null) clearTimeout(entryUpdateDelayTimeout.value);

  entryUpdateDelayTimeout.value = setTimeout(async () => {
    await dbSet(activeDateString.value, structuredClone(toRaw(newEntry)));
  }, 150);
};

watch(activeDate, activeDateWatcher, { immediate: true });
watch(databaseEntry, databaseEntryWatcher, { deep: true });
</script>

<template>
  <div class="flex flex-row justify-between p-1">
    <h1 class="text-xl">Julian's Star Chart</h1>
    <h1 class="text-xl">{{ activeDateString }}</h1>
  </div>

  <div class="flex justify-center mb-1 print:hidden">
    <button type="button" class="border border-slate-400 p-1 cursor-pointer mr-1" @click="() => activeDate = activeDate.subtract({ days: 1 })">Prev</button>
    <button type="button" class="border border-slate-400 p-1 cursor-pointer mr-1" @click="() => activeDate = Temporal.Now.plainDateISO()">Today</button>
    <button type="button" class="border border-slate-400 p-1 cursor-pointer" @click="() => activeDate = activeDate.add({ days: 1 })">Next</button>
  </div>

  <div v-if="databaseEntry !== null" class="flex flex-col">
    <div class="flex flex-row border-t border-t-slate-400">
      <div class="flex flex-col basis-1/3 grow-0 shrink-0 border-r border-r-slate-300 p-1">
        <p class="text-center underline mb-1">My Expectations</p>
        <div v-for="index of [0, 1, 2]" :key="index" class="flex flex-row mb-1 last-of-type:mb-0">
          <span class="mr-1">{{ index + 1 }}:</span>
          <input v-model="databaseEntry.expectations[index]" type="text" class="w-full border" />
        </div>
      </div>
      <div class="flex flex-col basis-1/3 grow-0 shrink-0 border-r border-r-slate-300 p-1">
        <p class="text-center underline mb-1">My Consequences</p>
        <div v-for="index of [0, 1, 2]" :key="index" class="flex flex-row mb-1 last-of-type:mb-0">
          <span class="mr-1">{{ index + 1 }}:</span>
          <input v-model="databaseEntry.consequences[index]" type="text" class="w-full border" />
        </div>
      </div>
      <div class="flex flex-col basis-1/3 grow-0 shrink-0 p-1">
        <p class="text-center underline mb-1">My Rewards</p>
        <div v-for="index of [0, 1, 2]" :key="index" class="flex flex-row mb-1 last-of-type:mb-0">
          <span class="mr-1">{{ index + 1 }}:</span>
          <input v-model="databaseEntry.rewards[index]" type="text" class="w-full border" />
        </div>
      </div>
    </div>

    <div class="flex flex-row flex-wrap border-t border-t-slate-400">
      <div v-for="(scheduleEntry, index) of databaseEntry.schedule" :key="index" class="flex flex-row basis-1/2 grow-0 shrink-0 p-1 border-t border-t-slate-400 first:border-t-0 nth-2:border-t-0 odd:border-r odd:border-r-slate-400">
        <div class="flex flex-col grow">
          <input type="text" v-model="databaseEntry.schedule[index].title" class="border mb-1 p-0.5" placeholder="Entry Title">
          <textarea v-model="databaseEntry.schedule[index].description" class="border p-1 resize-none h-13 overflow-hidden" placeholder="Entry Description"></textarea>
        </div>

        <div class="block w-16 h-16 border my-auto mx-1"></div>

        <div class="flex flex-col shrink">
          <div v-for="index of [0, 1, 2]" :key="index" class="flex flex-row grow items-center">
            <span class="mr-1">{{ index + 1 }}:</span>
            <input v-model="databaseEntry.rewards[index]" type="checkbox" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row border-t border-t-slate-400">
      <div class="flex flex-col grow border-r border-r-slate-400 px-1">
        <div class="flex flex-row items-end">
          <span class="text-lg mr-1 mt-1">Total:</span>
          <span>_________</span>
        </div>
        <div class="flex flex-row mt-1 mb-5">
          <span class="font-bold">Notes:</span>
        </div>
      </div>
      <div class="flex flex-col grow px-1">
        <div class="flex flex-row items-end">
          <span class="text-lg mr-1 mt-1">Total:</span>
          <span>_________</span>
        </div>
        <div class="flex flex-row mt-1 mb-5">
          <span class="font-bold">Notes:</span>
        </div>
      </div>
    </div>

    <div class="flex flex-row basis-1/2 grow-0 shrink-0 p-1 border-t border-t-slate-300 justify-between print:hidden">
      <button type="button" class="border border-slate-600 py-0.5 px-1 cursor-pointer" @click="databaseEntry?.schedule.push(generateEmptyScheduleEntry())">Add Entry</button>
      <button type="button" class="border border-slate-600 py-0.5 px-1 cursor-pointer" @click="databaseEntry?.schedule.pop()">Remove Entry</button>
    </div>
  </div>
</template>
