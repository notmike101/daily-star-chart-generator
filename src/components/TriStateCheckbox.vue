<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import checkmark from '@/assets/check-solid.svg?component';
import xmark from '@/assets/xmark-solid.svg?component';

interface Props {
  modelValue?: Nullable<boolean>;
  iconSize?: [number, number];
  label?: string;
}

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: () => '',
});
const input = ref<Nullable<HTMLInputElement>>(null);
const state = ref(-1);

const activeCheckboxImage = computed(() => {
  if (state.value === 0) return xmark;
  if (state.value === 1) return null;

  return checkmark;
});

const inputWatcher = (newValue: Nullable<HTMLInputElement>) => {
  if (!newValue) return;

  if (props.modelValue === false) {
    state.value = 0;
  } else if (props.modelValue === null) {
    state.value = 1;
  } else if (props.modelValue === true) {
    state.value = 2;
  }
};

const stateWatcher = (newValue: number) => {
  if (!input.value) return;

  if (newValue === 0) {
    input.value.indeterminate = false;
    input.value.checked = false;
  } else if (newValue === 1) {
    input.value.indeterminate = true;
    input.value.checked = false;
  } else if (newValue === 2) {
    input.value.indeterminate = false;
    input.value.checked = true;
  }
};

const toggleState = () => {
  if (!input.value) return;

  state.value = (state.value + 1) % 3;

  if (state.value === 0) {
    emit('update:modelValue', false);
  } else if (state.value === 1) {
    emit('update:modelValue', null);
  } else if (state.value === 2){
    emit('update:modelValue', true);
  }
};

watch(input, inputWatcher);
watch(state, stateWatcher);
</script>

<template>
  <label @click="toggleState" class="flex flex-row items-center justify-center cursor-pointer border w-[15px] h-[15px]">
    <input ref="input" type="checkbox" class="hidden" />
    <component v-if="activeCheckboxImage" :is="activeCheckboxImage" class="w-full h-full" />
    <p class="text-xs break-word" v-if="props.label">{{ props.label }}</p>
  </label>
</template>
