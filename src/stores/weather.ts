import type { City, WeatherData } from '@/stores/types';
import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { v4 as uuid } from 'uuid';

import { type GetWeatherParams, getWeather } from '@/api';

const initialSavedCities: City[] = [
  {
    id: 1,
    name: 'Berlin',
    country: 'Germany',
    latitude: 52.52,
    longitude: 13.41,
  },
  {
    id: 2,
    name: 'Paris',
    country: 'France',
    latitude: 48.85,
    longitude: 2.35,
  },
  {
    id: 3,
    name: 'London',
    country: 'England',
    latitude: 51.51,
    longitude: -0.13,
  },
];

export const useWeatherStore = defineStore('weather', () => {
  const isLoading = ref(false);
  const selectedDate = ref(new Date());
  const weatherData = ref<WeatherData[]>([]);
  const savedCities = useLocalStorage<City[]>(
    'savedCities',
    initialSavedCities
  );

  const FETCH_ALL_WEATHER_DATA = async () => {
    const weatherDataPromises = savedCities.value.map((city) => {
      const params: GetWeatherParams = {
        latitude: city.latitude,
        longitude: city.longitude,
        date: selectedDate.value,
      };

      return getWeather(params);
    });

    isLoading.value = true;
    const temperatures = await Promise.all(weatherDataPromises);

    weatherData.value = temperatures.map(({ tempMin, tempMax }, index) => {
      return {
        id: uuid(),
        city: { ...savedCities.value[index] },
        tempMin,
        tempMax,
      };
    });

    isLoading.value = false;
  };

  const ADD_CITY = async (city: City) => {
    const params: GetWeatherParams = {
      latitude: city.latitude,
      longitude: city.longitude,
      date: selectedDate.value,
    };

    isLoading.value = true;
    const data = await getWeather(params);

    savedCities.value.push({ ...city });
    weatherData.value.push({
      id: uuid(),
      city: { ...city },
      ...data,
    });
    isLoading.value = false;
  };

  const DELETE_CITY = (id: number) => {
    savedCities.value = savedCities.value.filter((city) => city.id !== id);
    weatherData.value = weatherData.value.filter((data) => data.city.id !== id);
  };

  const UPDATE_SELECTED_DATE = (date: Date) => {
    selectedDate.value = date;
  };

  watch(selectedDate, FETCH_ALL_WEATHER_DATA);

  return {
    weatherData,
    isLoading,
    FETCH_ALL_WEATHER_DATA,
    ADD_CITY,
    DELETE_CITY,
    UPDATE_SELECTED_DATE,
  };
});
