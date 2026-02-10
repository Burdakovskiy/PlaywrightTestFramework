import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { AutomationExerciseApi } from '../endpoints/AutomationExerciseApi';

export function createApi(args: { request: APIRequestContext; baseUrl: string }) {
  const client = new ApiClient(args.request, args.baseUrl);
  return new AutomationExerciseApi(client);
}
