export interface GeoPlace {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface CurrentWeather {
  temperatureC: number;
  weatherCode: number;
  localTime: string; // 'YYYY-MM-DDTHH:mm', already in the branch's own time zone
}
