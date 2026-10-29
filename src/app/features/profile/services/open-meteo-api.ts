import { CurrentWeather, GeoPlace } from '../models/weather-model';

export const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
export const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseGeocoding(raw: unknown): GeoPlace | null {
  if (!isRecord(raw)) throw new Error('Unexpected geocoding response');

  const results = raw['results'];
  if (results === undefined) return null; // the API omits "results" when nothing matches
  if (!Array.isArray(results)) throw new Error('Unexpected geocoding response');

  const first: unknown = results[0];
  if (!isRecord(first)) return null;

  const { name, latitude, longitude, country } = first;
  if (typeof name !== 'string' || typeof latitude !== 'number' || typeof longitude !== 'number') {
    throw new Error('Unexpected geocoding response');
  }

  return { name, latitude, longitude, country: typeof country === 'string' ? country : '' };
}

export function parseForecast(raw: unknown): CurrentWeather {
  if (!isRecord(raw) || !isRecord(raw['current'])) throw new Error('Unexpected forecast response');

  const { temperature_2m, weather_code, time } = raw['current'];
  if (
    typeof temperature_2m !== 'number' ||
    typeof weather_code !== 'number' ||
    typeof time !== 'string'
  ) {
    throw new Error('Unexpected forecast response');
  }

  return { temperatureC: temperature_2m, weatherCode: weather_code, localTime: time };
}
