import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';

export abstract class BasePage {
  constructor(
    protected readonly page: Page,
    protected readonly config: LoadedConfig,
    protected readonly waiter: Waiter,
    protected readonly logger: Logger,
  ) {}

  protected async safeClick(locator: Locator, description: string = 'click'): Promise<void> {
    this.logger.info(`Action: ${description}`);
    await this.waiter.waitVisible(locator);
    await locator.click();
  }

  protected async safeFill(
    locator: Locator,
    value: string,
    description: string = 'fill',
  ): Promise<void> {
    this.logger.info(`Action: ${description} = "${value}"`);
    await this.waiter.waitVisible(locator);
    await locator.fill(value);
  }
}
