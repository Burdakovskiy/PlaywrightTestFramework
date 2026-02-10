import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';

export class AccountCreatedPage extends BasePage {
  private readonly view: {
    title: Locator;
  };

  private readonly actions: {
    continue: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.view = {
      title: this.page.getByRole('heading', { name: /account created!/i }),
    };

    this.actions = {
      continue: this.page.getByRole('link', { name: 'Continue' }),
    };
  }

  async continueToHome(): Promise<void> {
    await this.safeClick(this.actions.continue, 'Click Continue');
  }

  async assertAccountCreatedVisible(): Promise<void> {
    await this.waiter.waitVisible(this.view.title);
  }
}
