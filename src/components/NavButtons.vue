<script lang="ts" setup>
import { inject, type Ref } from 'vue';
import { Temporal } from '@js-temporal/polyfill';

const activeDate = inject('activeDate') as Ref<Temporal.PlainDate>;

const previousDay = () => activeDate.value = activeDate.value.subtract({ days: 1 });
const nextDay = () => activeDate.value = activeDate.value.add({ days: 1 });
const today = () => activeDate.value = Temporal.Now.plainDateISO();
</script>

<template>
  <div class="flex justify-center mb-1 print:hidden">
    <button type="button" class="border border-slate-400 p-1 cursor-pointer mr-1" @click="previousDay">Prev</button>
    <button type="button" class="border border-slate-400 p-1 cursor-pointer mr-1" @click="today">Today</button>
    <button type="button" class="border border-slate-400 p-1 cursor-pointer" @click="nextDay">Next</button>
  </div>
</template>
