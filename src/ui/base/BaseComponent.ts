import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';

export abstract class BaseComponent {
  constructor(
    protected readonly page: Page,
    protected readonly config: LoadedConfig,
    protected readonly waiter: Waiter,
    protected readonly logger: Logger,
  ) {}

  protected async safeClick(locator: Locator, description: string = 'click'): Promise<void> {
    this.logger.info(`Component action: ${description}`);
    await this.waiter.waitVisible(locator);
    await locator.click();
  }

  protected async assertTextContains(
    locator: Locator,
    value: string,
    step?: string,
  ): Promise<void> {
    if (step) {
      this.logger.info(step);
    }
    await this.waiter.waitVisible(locator);
    await this.waiter.waitText(locator, value);
  }
}
