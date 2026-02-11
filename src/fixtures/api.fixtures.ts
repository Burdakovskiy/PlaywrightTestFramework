import { test as base } from '@playwright/test';
import { createApi } from '../../src/api/client/createApi';
import { ConsoleLogger } from '../logging/Logger';

type Fixtures = {
  aeApi: ReturnType<typeof createApi>;
  logger: ConsoleLogger;
  step: <T>(name: string, body: () => Promise<T>) => Promise<T>;
};

export const test = base.extend<Fixtures>({
  logger: async ({}, use, testInfo) => {
    const logger = new ConsoleLogger(testInfo.title, (process.env.LOG_LEVEL as any) ?? 'info');
    await use(logger);
  },

  aeApi: async ({ request }, use) => {
    const baseUrl = process.env.AE_API_BASE_URL ?? 'https://automationexercise.com';
    const api = createApi({ request, baseUrl });
    await use(api);
  },

  step: async ({ logger }, use) => {
    const step = async <T>(name: string, body: () => Promise<T>): Promise<T> => {
      logger.info(`[STEP] ${name}`);
      return await base.step(name, body);
    };
    await use(step);
  },
});

export { expect } from '@playwright/test';
