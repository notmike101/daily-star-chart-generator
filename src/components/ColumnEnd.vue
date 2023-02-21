<script lang="ts" setup>
import { inject, type Ref } from 'vue';

interface IProps {
  index: number;
}

const props = defineProps<IProps>();
const databaseEntry = inject('databaseEntry') as Ref<ChartDBEntry>;
</script>

<template>
  <div class="flex flex-col basis-1/2 border-r border-r-slate-400 p-1">
    <div class="flex flex-row items-end">
      <span class="font-bold mr-1">Total:</span>
      <input type="text" v-model="databaseEntry.totals[props.index]" class="border-b border-b-slate-400" />
    </div>
    <div class="flex flex-row mt-1">
      <span class="font-bold mr-1">Notes:</span>
      <textarea v-model="databaseEntry.misc[props.index]" class="border print:border-0 resize-none h-10 w-full"></textarea>
    </div>
  </div>
</template>
