import type { Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class AccountCreatedPage extends BasePage {
  private readonly view: {
    title: Locator;
  };

  private readonly actions: {
    continue: Locator;
  };

  constructor(...args: ConstructorParameters<typeof BasePage>) {
    super(...args);

    this.view = {
      title: this.page.getByRole('heading', { name: /account created!/i }),
    };

    this.actions = {
      continue: this.page.getByRole('link', { name: 'Continue' }),
    };
  }

  async assertAccountCreatedVisible(): Promise<void> {
    this.logger.info('AccountCreated: assert ACCOUNT CREATED visible');
    await this.waiter.waitVisible(this.view.title);
  }

  async continueToHome(): Promise<void> {
    this.logger.info('AccountCreated: click Continue');
    await this.safeClick(this.actions.continue, 'Click Continue');
  }
}
