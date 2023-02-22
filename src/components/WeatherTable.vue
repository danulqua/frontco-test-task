<template>
  <table class="w-full shadow">
    <thead class="bg-brand-primary">
      <tr>
        <th class="w-[40%] cursor-pointer" @click="handleSort('name')">
          <div class="flex items-center justify-center">
            City
            <AngleIcon
              v-if="sortOptions.sortBy === 'name'"
              :direction="angleIconDirection"
            />
          </div>
        </th>
        <th class="w-[25%] cursor-pointer" @click="handleSort('tempMin')">
          <div class="flex items-center justify-center">
            Min Temp
            <AngleIcon
              v-if="sortOptions.sortBy === 'tempMin'"
              :direction="angleIconDirection"
            />
          </div>
        </th>
        <th class="w-[25%] cursor-pointer" @click="handleSort('tempMax')">
          <div class="flex items-center justify-center">
            Max Temp
            <AngleIcon
              v-if="sortOptions.sortBy === 'tempMax'"
              :direction="angleIconDirection"
              class="absolute top-1/2 left-2 -translate-y-1/2 transform"
            />
          </div>
        </th>
        <th class="w-[10%]"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(weather, idx) in sortedWeatherData"
        :key="weather.id"
        :class="{
          'bg-brand-green-light-1': idx % 2 === 0,
          'bg-brand-green-light-2': idx % 2 !== 0,
        }"
      >
        <td class="py-1 text-center">{{ weather.city.name }}</td>
        <td class="py-1 text-center">{{ weather.tempMin }}</td>
        <td class="py-1 text-center">{{ weather.tempMax }}</td>
        <td class="align-center flex justify-center py-1">
          <button
            class="group flex items-center justify-center rounded p-1 transition-all hover:bg-red-500"
            @click="$emit('delete', weather.city.id)"
          >
            <TrashIcon
              class="h-6 w-6 fill-red-500 transition-all group-hover:fill-white"
            />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { useWeatherStore } from '@/stores/weather';
import TrashIcon from '@/icons/TrashIcon.vue';
import AngleIcon from '@/icons/AngleIcon.vue';

interface SortOptions {
  sortBy: 'name' | 'tempMin' | 'tempMax';
  sortDirection: 'asc' | 'desc';
}

defineEmits(['delete']);

const sortOptions = ref<SortOptions>({ sortBy: 'name', sortDirection: 'asc' });

const weatherStore = useWeatherStore();
const sortedWeatherData = computed(() => {
  const { sortDirection } = sortOptions.value;
  const data = [...weatherStore.weatherData];

  return data.sort((a, b) => {
    switch (sortOptions.value.sortBy) {
      case 'name':
        return sortDirection === 'asc'
          ? a.city.name.localeCompare(b.city.name)
          : b.city.name.localeCompare(a.city.name);
      case 'tempMin':
        return sortDirection === 'asc'
          ? a.tempMin - b.tempMin
          : b.tempMin - a.tempMin;
      case 'tempMax':
        return sortDirection === 'asc'
          ? a.tempMax - b.tempMax
          : b.tempMax - a.tempMax;
      // TODO: investigate why this doesn't work
      // case 'tempMin':
      // case 'tempMax':
      //   if (a[sortBy as keyof WeatherData] < b[sortBy as keyof WeatherData]) {
      //     return sortDirection === 'asc' ? -1 : 1;
      //   }
      default:
        return 0;
    }
  });
});

const angleIconDirection = computed(() => {
  return sortOptions.value.sortDirection === 'asc' ? 'up' : 'down';
});

const handleSort = (sortBy: SortOptions['sortBy']) => {
  if (sortOptions.value.sortBy === sortBy) {
    sortOptions.value.sortDirection =
      sortOptions.value.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortOptions.value.sortBy = sortBy;
    sortOptions.value.sortDirection = 'asc';
  }
};
</script>
