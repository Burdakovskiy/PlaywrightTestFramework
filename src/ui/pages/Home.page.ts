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

    this.header = new HeaderComponent(this.page, this.config, this.waiter, this.logger);
    this.view = {
      body: this.page.locator('body'),
    };
  }

  async openHome(): Promise<void> {
    await this.open('/');
  }

  async assertVisible(): Promise<void> {
    this.logger.info('Home: assert visible');
    await this.waiter.waitVisible(this.view.body);
    await this.header.assertSignupLoginVisible();
  }

  async goToLoginSignup(): Promise<void> {
    this.logger.info('Home: go to Login/Signup');
    await this.header.clickSignupLogin();
  }

  async assertLoggedInAs(expectedName: string): Promise<void> {
    this.logger.info(`Home: assert logged in as "${expectedName}"`);
    await this.header.assertLoggedInAs(expectedName);
  }

  async goToAccountDeletion(): Promise<void> {
    this.logger.info('Home: go to account deletion');
    await this.header.clickDeleteAccount();
  }

  async logout(): Promise<void> {
    this.logger.info('Home: go to logout from account');
    await this.header.clickLogout();
  }

  async assertLogoutVisible(): Promise<void> {
    await this.header.logoutVisible();
  }

  async assertNotLoggedIn(): Promise<void> {
    await this.header.assertNotLoggedIn();
  }
}
