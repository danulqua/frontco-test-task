<template>
  <span class="text-lg">{{ label }}</span>
  <vue-datepicker
    v-model="date"
    class="mt-1"
    :min-date="minDate"
    :max-date="maxDate"
    :prevent-min-max-navigation="true"
    :enable-time-picker="false"
    :month-change-on-scroll="false"
    :auto-apply="true"
    :show-now-button="true"
    :clearable="false"
    @update:model-value="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getMinAndMaxDates } from '@/utils/getMinAndMaxDates';
import { useWeatherStore } from '@/stores/weather';

defineProps({
  label: {
    type: String,
    required: false,
    default: 'Date',
  },
});

const { minDate, maxDate } = getMinAndMaxDates();

const date = ref(new Date());

const weatherStore = useWeatherStore();
const handleSubmit = () => {
  weatherStore.UPDATE_SELECTED_DATE(date.value);
};
</script>
