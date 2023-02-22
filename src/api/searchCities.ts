import type { CitiesResponse, CityResponse } from '@/api/types';
import axios from 'axios';

// Get rid of unnecessary cities data
const transformCityData = (city: CityResponse) => {
  return {
    id: city.id,
    name: city.name,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
  };
};

// Search cities by query
export const searchCities = async (searchTerm: string) => {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.searchParams.append('name', searchTerm);

  const response = await axios.get<CitiesResponse>(url.toString());

  if (!response.data.results.length) return [];
  return response.data.results.map(transformCityData);
};
