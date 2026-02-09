import { test as base, expect } from '@playwright/test';
import type { LoadedConfig } from '../config/types';
import { ConfigLoader } from '../config/ConfigLoader';
import { ConsoleLogger } from '../logging/Logger';
import { Timeouts } from '../utils/Timeouts';
import { Waiter } from '../utils/Waiter';
import type { TestContext } from './types';
import { UiRegistry } from '../utils/UiRegistry';

type WorkerFixtures = {
  config: LoadedConfig;
};

type Fixtures = {
  ctx: TestContext;
};

export const test = base.extend<Fixtures, WorkerFixtures>({
  config: [
    async ({}, use) => {
      console.log('[ConfigLoader] load called');
      const config = ConfigLoader.load();
      await use(config);
    },
    { scope: 'worker' },
  ],
  ctx: async ({ page, config }, use, testInfo) => {
    const logger = new ConsoleLogger(testInfo.title);
    const timeouts = Timeouts.from(config);
    const waiter = new Waiter(page, expect, timeouts);
    const uiRegistry = new UiRegistry({ page, config, waiter, logger });

    await page.addInitScript(() => {
      window.confirm = () => true;
    });

    logger.info('Creating TestContext');

    const ctx: TestContext = {
      page,
      config,
      logger,
      timeouts,
      waiter,
      uiRegistry,
    };

    await use(ctx);
    logger.info('TestContext disposed');
  },
});

export { expect };
