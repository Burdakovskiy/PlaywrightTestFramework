import { test as base, expect } from '@playwright/test';
import { ConfigLoader } from '../config/ConfigLoader';
import { ConsoleLogger } from '../logging/Logger';
import type { TestContext } from './types';

type Fixtures = {
  ctx: TestContext;
};

export const test = base.extend<Fixtures>({
  ctx: async ({ page }, use, testInfo) => {
    const config = ConfigLoader.load();
    const logger = new ConsoleLogger(testInfo.title);

    logger.info('Creating TestContext');

    const ctx: TestContext = {
      page,
      config,
      logger,
    };

    await use(ctx);
    logger.info('TestContext disposed');
  },
});

export { expect };
