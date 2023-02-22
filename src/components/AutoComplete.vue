<template>
  <ul class="max-h-[200px] w-full overflow-auto rounded border border-gray-200">
    <li
      v-for="item in autocompletionData"
      :tabindex="0"
      :key="item.id"
      class="cursor-pointer border-b border-gray-200 bg-brand-white p-2 text-zinc-900 outline-none last:border-none hover:bg-gray-100 focus:bg-gray-100"
      @click="handleSelect(item)"
      @keydown.enter="handleSelect(item)"
    >
      {{ item.country }}, {{ item.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { City } from '@/stores/types';

defineProps({
  autocompletionData: {
    type: Array as PropType<City[]>,
    required: true,
  },
});

const emit = defineEmits(['select']);

const handleSelect = (item: City) => {
  emit('select', item);
};
</script>
