export interface WeatherData {
  id: string;
  city: City;
  tempMin: number;
  tempMax: number;
}

export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}
