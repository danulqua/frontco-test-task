import type { WeatherResponse } from '@/api/types';
import axios from 'axios';
import { formatDate } from '@/utils/formatDate';

export interface GetWeatherParams {
  latitude: number;
  longitude: number;
  date?: Date;
}

// Get rid of unnecessary weather data
const transformWeatherData = (data: WeatherResponse) => {
  return {
    tempMin: data.daily.temperature_2m_min[0],
    tempMax: data.daily.temperature_2m_max[0],
  };
};

// Fetching weather data
export const getWeather = async ({
  latitude,
  longitude,
  date = new Date(),
}: GetWeatherParams) => {
  const baseUrl =
    'https://api.open-meteo.com/v1/forecast?daily=temperature_2m_max&daily=temperature_2m_min&timezone=GMT&';

  console.log(date);
  const day = formatDate(date);
  const response = await axios.get<WeatherResponse>(
    `${baseUrl}latitude=${latitude}&longitude=${longitude}&start_date=${day}&end_date=${day}`
  );

  return transformWeatherData(response.data);
};
