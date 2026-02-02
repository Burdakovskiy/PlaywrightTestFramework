import { Page } from '@playwright/test';
import { LoadedConfig } from '../config/types';
import { ConsoleLogger } from '../logging/Logger';
import { EffectiveTimeouts } from '../utils/Timeouts';
import { Waiter } from '../utils/Waiter';

export interface TestContext {
  page: Page;
  config: LoadedConfig;
  logger: ConsoleLogger;
  timeouts: EffectiveTimeouts;
  waiter: Waiter;
}
