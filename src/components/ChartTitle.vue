<script lang="ts" setup>
import { inject, type ComputedRef } from 'vue';

const databaseEntry = inject('databaseEntry') as ComputedRef<ChartDBEntry>;
const activeDateString = inject('activeDateString') as ComputedRef<string>;
</script>

<template>
  <div class="flex flex-row justify-between p-1">
    <input type="text" v-model="databaseEntry.title" class="text-md border grow mr-1 p-0.5 print:border-0 print:placeholder:text-transparent" placeholder="Chart Title" />
    <h1 class="text-md p-0.5">{{ activeDateString }}</h1>
  </div>
</template>
