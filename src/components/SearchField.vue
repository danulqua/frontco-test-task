<template>
  <form class="flex flex-col">
    <label for="search-field" class="text-lg">{{ label }}</label>
    <div class="relative">
      <SearchIcon
        class="absolute top-1/2 left-2 h-5 w-5 -translate-y-1/2 transform stroke-gray-400"
      />
      <input
        v-model="searchValue"
        id="search-field"
        class="h-[38px] w-full items-center rounded border border-gray-200 pl-8 pr-2 text-zinc-900 outline-none transition-[border] duration-300 hover:border-gray-400"
        type="text"
        :placeholder="placeholder"
        @input="handleInput"
      />
      <AutoComplete
        v-if="autocompletionData.length"
        ref="autocomplete"
        :autocompletion-data="autocompletionData"
        class="absolute -bottom-1 translate-y-full"
        @select="handleSelect"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import debounce from 'lodash/debounce';
import SearchIcon from '@/icons/SearchIcon.vue';
import AutoComplete from '@/components/AutoComplete.vue';
import type { City } from '@/stores/types';

import { useWeatherStore } from '@/stores/weather';
import { searchCities } from '@/api';

defineProps({
  placeholder: {
    type: String,
    required: false,
    default: 'Type here...',
  },
  label: {
    type: String,
    required: false,
    default: 'Search',
  },
});

const searchValue = ref('');
const autocompletionData = ref<City[]>([]);

const weatherStore = useWeatherStore();

const debouncedSearch = debounce(async (searchTerm: string) => {
  const cities = await searchCities(searchTerm.trim());
  autocompletionData.value = cities.filter((city) => {
    return !weatherStore.weatherData.find((c) => c.city.id === city.id);
  });
}, 500);

const handleInput = () => {
  if (!searchValue.value.trim()) {
    autocompletionData.value = [];
    return debouncedSearch.cancel();
  }

  debouncedSearch(searchValue.value);
};

const handleSelect = (city: City) => {
  weatherStore.ADD_CITY(city);
  searchValue.value = '';
  autocompletionData.value = [];
};
</script>
