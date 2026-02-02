import type { Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { headerLocators } from '../locators/header.locators';

export class HeaderComponent {
  constructor(
    private readonly page: Page,
    private readonly _config: LoadedConfig,
    private readonly waiter: Waiter,
    private readonly logger: Logger,
  ) {}

  async clickSignupLogin(): Promise<void> {
    this.logger.info('Header: click Signup / Login');
    const link = headerLocators.signupLoginLink(this.page);
    await this.waiter.waitVisible(link);
    await link.click();
  }

  async assertLoggedInAs(expectedName: string): Promise<void> {
    this.logger.info(`Header: assert Logged in as "${expectedName}"`);
    const logged = headerLocators.loggedInAsText(this.page);
    await this.waiter.waitVisible(logged);
    await this.waiter.waitText(logged, expectedName);
  }

  async clickDeleteAccount(): Promise<void> {
    this.logger.info('Header: click Delete Account');
    const link = headerLocators.deleteAccountLink(this.page);
    await this.waiter.waitVisible(link);
    await link.click();
  }
}
