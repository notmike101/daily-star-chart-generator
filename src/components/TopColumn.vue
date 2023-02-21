<script lang="ts" setup>
import { inject, type Ref } from 'vue';

interface IProps {
  index: number;
}

const databaseEntry = inject('databaseEntry') as Ref<ChartDBEntry>;
const props = defineProps<IProps>();
</script>

<template>
  <div class="flex flex-col basis-1/3 grow-0 shrink-0 border-r border-r-slate-300 p-1">
    <input type="text" v-model="databaseEntry.topColumns[props.index].title" class="border text-center underline mb-1 print:border-0 print:placeholder:text-transparent" placeholder="Section Title" />
    <div v-for="(item, index) of databaseEntry.topColumns[props.index].items" :key="index" class="flex flex-row mb-1 last-of-type:mb-0">
      <span class="mr-1">{{ index + 1 }}:</span>
      <input v-model="databaseEntry.topColumns[props.index].items[index]" type="text" class="w-full border print:border-0 print:placeholder:text-transparent" placeholder="Item" />
    </div>
  </div>
</template>
