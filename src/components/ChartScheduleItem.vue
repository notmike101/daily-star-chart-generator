<script lang="ts" setup>
import { inject, type Ref } from 'vue';
import TriStateCheckbox from '@/components/TriStateCheckbox.vue';
import StarIcon from '@/assets/star-regular.svg?component';
import SadIcon from '@/assets/face-frown-regular.svg?component';

interface IProps {
  index: number;
}

const props = defineProps<IProps>();
const databaseEntry = inject('databaseEntry') as Ref<ChartDBEntry>;
</script>

<template>
  <div class="flex flex-row basis-1/2 grow-0 shrink-0 p-1 border-t border-t-slate-400 first:border-t-0 nth-2:border-t-0 odd:border-r odd:border-r-slate-400">
    <div class="flex flex-col grow">
      <input type="text" v-model="databaseEntry.schedule[props.index].title" class="border mb-1 p-0.5 print:border-0 print:placeholder:text-transparent" placeholder="Entry Title">
      <textarea v-model="databaseEntry.schedule[props.index].description" class="border p-1 resize-none h-13 overflow-hidden print:border-0 print:placeholder:text-transparent" placeholder="Entry Description"></textarea>
    </div>

    <div class="block w-16 h-16 border my-auto mx-1 p-3">
      <SadIcon v-if="databaseEntry.schedule[props.index].expectationsMet.filter((value) => value === false).length > 0" />
      <StarIcon v-if="databaseEntry.schedule[props.index].expectationsMet.filter((value) => value === true).length === 3" />
    </div>

    <div class="flex flex-col shrink">
      <div v-for="index of [0, 1, 2]" :key="index" class="flex flex-row grow items-center">
        <span class="mr-1">{{ index + 1 }}:</span>
        <TriStateCheckbox v-model="databaseEntry.schedule[props.index].expectationsMet[index]" />
      </div>
    </div>
  </div>
</template>
