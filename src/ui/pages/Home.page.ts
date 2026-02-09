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
    subscriptionTitle: Locator;
    scrollUpArrow: Locator;
    mainTitle: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.header = new HeaderComponent(page, config, waiter, logger);
    this.view = {
      body: this.page.locator('body'),
      subscriptionTitle: this.page.getByRole('heading', {
        name: /SUBSCRIPTION/i,
      }),
      scrollUpArrow: this.page.locator('#scrollUp'),
      mainTitle: this.page.getByRole('heading', {
        name: /Full-Fledged practice website for Automation Engineers/i,
      }),
    };
  }

  async assertVisible(): Promise<void> {
    await this.waiter.waitVisible(this.view.body);
    await this.header.assertSignupLoginVisible();
  }

  async scrollToSubscriptionAndAssertVisible(): Promise<void> {
    await this.view.subscriptionTitle.scrollIntoViewIfNeeded();
    await this.waiter.waitVisible(this.view.subscriptionTitle);
  }

  async clickScrollUpArrowAndAssertTop(): Promise<void> {
    await this.waiter.waitVisible(this.view.scrollUpArrow);
    await this.view.scrollUpArrow.click();
    await this.waiter.waitVisible(this.view.mainTitle);
  }

  async scrollToTopAndAssertTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.waiter.waitVisible(this.view.mainTitle);
  }
}
