import { APIRequestContext } from '@playwright/test';
import { ApiClient } from './ApiClient';
import { AutomationExerciseApi } from '../endpoints/AutomationExerciseApi';
import type { Logger } from '../../logging/Logger';

export function createApi(args: { request: APIRequestContext; baseUrl: string; logger?: Logger }) {
  const client = new ApiClient(args.request, args.baseUrl, {
    logger: args.logger,
    logMode: (process.env.API_LOG_MODE as any) ?? 'on-failure',
    maxBodyChars: Number(process.env.API_LOG_MAX_CHARS ?? '4000'),
  });
  return new AutomationExerciseApi(client);
}
