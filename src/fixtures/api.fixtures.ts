import { test as base } from '@playwright/test';
import { createApi } from '../../src/api/client/createApi';

type Fixtures = {
  aeApi: ReturnType<typeof createApi>;
};

export const test = base.extend<Fixtures>({
  aeApi: async ({ request }, use) => {
    const baseUrl = process.env.AE_API_BASE_URL ?? 'https://automationexercise.com';

    const api = createApi({ request, baseUrl });
    await use(api);
  },
});

export { expect } from '@playwright/test';
