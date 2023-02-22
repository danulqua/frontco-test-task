<template>
  <TheHeader />
  <main class="container mx-auto mt-16 px-8 md:p-0">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-8">
        <p
          v-if="!weatherStore.weatherData.length && !weatherStore.isLoading"
          class="text-center text-2xl font-bold text-brand-green-light-1"
        >
          Feel free to add city for viewing weather! 🌤️
        </p>
        <WeatherTable
          v-if="weatherStore.weatherData.length"
          @delete="handleDeleteCity"
        />
        <LoadingIndicator v-if="weatherStore.isLoading" class="mt-2" />
      </div>
      <div
        class="order-first col-span-12 text-brand-white md:order-last md:col-span-4 md:col-start-9"
      >
        <div class="flex flex-col space-y-2">
          <DatePicker label="Day of the forecast" />
          <SearchField label="Add new city" placeholder="City name..." />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import WeatherTable from '@/components/WeatherTable.vue';
import DatePicker from '@/components/DatePicker.vue';
import SearchField from '@/components/SearchField.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';

import { useWeatherStore } from '@/stores/weather';

const weatherStore = useWeatherStore();
onMounted(weatherStore.FETCH_ALL_WEATHER_DATA);

const handleDeleteCity = (cityId: number) => {
  weatherStore.DELETE_CITY(cityId);
};
</script>

<style>
:root {
  @apply bg-brand-green-dark;
}
</style>
