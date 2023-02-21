<script lang="ts" setup>
import { computed, ref, watch, toRaw, provide } from 'vue'
import { get as dbGet, set as dbSet } from 'idb-keyval';
import { Temporal } from '@js-temporal/polyfill';
import { generateEmptyDBEntry, generateEmptyScheduleEntry } from '@/compostables/dataManager';

import ChartTitle from '@/components/ChartTitle.vue';
import NavButtons from '@/components/NavButtons.vue';
import ChartScheduleItem from '@/components/ChartScheduleItem.vue';
import TopColumn from '@/components/TopColumn.vue';
import ColumnEnd from '@/components/ColumnEnd.vue';

const activeDate = ref(Temporal.Now.plainDateISO());
const activeDateString = computed(() => `${activeDate.value.year}-${activeDate.value.month.toString().padStart(2, '0')}-${activeDate.value.day.toString().padStart(2, '0')}`);
const databaseEntry = ref<Nullable<ChartDBEntry>>(null);
const skipDatabaseEntryWatcher = ref(false);
const entryUpdateDelayTimeout = ref<number>();

const activeDateWatcher = async (newDate: Temporal.PlainDate) => {
  const newDateString = `${newDate.year}-${newDate.month.toString().padStart(2, '0')}-${newDate.day.toString().padStart(2, '0')}`;
  let entry = await dbGet<ChartDBEntry>(newDateString);

  if (!entry) {
    const newEntry = generateEmptyDBEntry(newDateString);

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

provide('activeDate', activeDate);
provide('databaseEntry', databaseEntry);
provide('activeDateString', activeDateString);
</script>

<template>
  <ChartTitle v-if="databaseEntry !== null" />
  <NavButtons v-if="databaseEntry !== null" />

  <div v-if="databaseEntry !== null" class="flex flex-col">
    <div class="flex flex-row border-t border-t-slate-400">
      <TopColumn v-for="index in [0, 1, 2]" :key="index" :index="index" />
    </div>

    <div class="flex flex-row flex-wrap border-t border-t-slate-400">
      <ChartScheduleItem v-for="(scheduleEntry, index) of databaseEntry.schedule" :key="index" :index="index" />
    </div>

    <div class="flex flex-row basis-1/2 grow-0 shrink-0 p-1 border-t border-t-slate-400 justify-between print:hidden">
      <button type="button" class="border border-slate-600 py-0.5 px-1 cursor-pointer" @click="databaseEntry?.schedule.push(generateEmptyScheduleEntry())">Add Entry</button>
      <button type="button" class="border border-slate-600 py-0.5 px-1 cursor-pointer" @click="databaseEntry?.schedule.pop()">Remove Entry</button>
    </div>

    <div class="flex flex-row border-t border-t-slate-400">
      <ColumnEnd v-for="index in [0, 1]" :index="index" :key="index" />
    </div>
  </div>
</template>
