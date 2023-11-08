import { User } from './User';
import { WeatherConditions } from './WeatherConditions';

export interface APIResponse {
  success: boolean;
  message?: string;
  body?: User | WeatherConditions;
}
