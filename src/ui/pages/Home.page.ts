import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';
import { HeaderComponent } from '../components/Header.component';

export class HomePage extends BasePage {
  protected readonly header: HeaderComponent;

  private readonly view: {
    body: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.header = new HeaderComponent(page, config, waiter, logger);
    this.view = {
      body: this.page.locator('body'),
    };
  }

  async assertVisible(): Promise<void> {
    this.logger.info('Home: assert visible');
    await this.waiter.waitVisible(this.view.body);
    await this.header.assertSignupLoginVisible();
  }
}
