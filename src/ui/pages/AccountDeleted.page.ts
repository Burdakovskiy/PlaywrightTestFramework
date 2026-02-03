import type { Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class AccountDeletedPage extends BasePage {
  private readonly view: {
    title: Locator;
  };

  private readonly actions: {
    continue: Locator;
  };

  constructor(...args: ConstructorParameters<typeof BasePage>) {
    super(...args);

    this.view = {
      title: this.page.getByRole('heading', { name: /account deleted!/i }),
    };

    this.actions = {
      continue: this.page.getByRole('link', { name: 'Continue' }),
    };
  }

  async assertAccountDeletedVisible(): Promise<void> {
    this.logger.info('AccountDeleted: assert ACCOUNT DELETED visible');
    await this.waiter.waitVisible(this.view.title);
  }

  async continue(): Promise<void> {
    this.logger.info('AccountDeleted: click Continue');
    await this.safeClick(this.actions.continue, 'Click Continue');
  }
}
