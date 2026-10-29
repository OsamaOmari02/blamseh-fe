import { httpResource } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { Branch } from '@shared/models/branch-model';
import { getOpeningStatus } from '../../models/opening-hours';
import { describeWeather } from '../../models/weather-description';
import {
  FORECAST_URL,
  GEOCODING_URL,
  parseForecast,
  parseGeocoding,
} from '../../services/open-meteo-api';

type WeatherView =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'not-found' }
  | {
      kind: 'ready';
      temperature: number;
      description: string;
      time: string;
      open: boolean;
      hoursLabel: string;
    };

@Component({
  selector: 'app-branch-weather',
  templateUrl: './branch-weather.html',
  styleUrl: './branch-weather.scss',
})
export class BranchWeather {
  readonly branch = input.required<Branch>(); // must be declared before the resources

  private readonly place = httpResource(
    () => ({
      url: GEOCODING_URL,
      params: { name: this.branch().city, count: 1, language: 'en', format: 'json' },
    }),
    { parse: parseGeocoding },
  );

  private readonly weather = httpResource(
    () => {
      const place = this.place.hasValue() ? this.place.value() : null;
      if (!place) return undefined; // stay idle until we know the coordinates

      return {
        url: FORECAST_URL,
        params: {
          latitude: place.latitude,
          longitude: place.longitude,
          current: 'temperature_2m,weather_code',
          timezone: 'auto',
        },
      };
    },
    { parse: parseForecast },
  );

  protected readonly view = computed<WeatherView>(() => {
    const error = this.place.error() ?? this.weather.error();
    if (error) return { kind: 'error', message: error.message };

    if (this.place.hasValue() && this.place.value() === null) return { kind: 'not-found' };

    if (this.weather.hasValue()) {
      const current = this.weather.value();
      const status = getOpeningStatus(this.branch().hours, current.localTime);

      return {
        kind: 'ready',
        temperature: Math.round(current.temperatureC),
        description: describeWeather(current.weatherCode),
        time: current.localTime.slice(11, 16),
        open: status.open,
        hoursLabel: status.todayRange
          ? `Today ${status.todayRange.opens} to ${status.todayRange.closes}`
          : 'Closed today',
      };
    }

    return { kind: 'loading' };
  });

  protected retry() {
    if (this.place.error()) {
      this.place.reload();
    } else {
      this.weather.reload();
    }
  }
}
