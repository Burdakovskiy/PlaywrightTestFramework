import { Page } from '@playwright/test';
import { LoadedConfig } from '../config/types';
import { ConsoleLogger } from '../logging/Logger';

export interface TestContext {
  page: Page;
  config: LoadedConfig;
  logger: ConsoleLogger;
}
