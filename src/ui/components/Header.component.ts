import type { Page, Locator } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BaseComponent } from '../base/BaseComponent';

export class HeaderComponent extends BaseComponent {
  protected readonly nav: {
    signupLoginLink: Locator;
    loggedInAsText: Locator;
    deleteAccountLink: Locator;
    logoutLink: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);
    this.nav = {
      signupLoginLink: this.page.getByRole('link', { name: 'Signup / Login' }),
      loggedInAsText: this.page.getByText('Logged in as', { exact: false }),
      deleteAccountLink: this.page.getByRole('link', { name: 'Delete Account' }),
      logoutLink: this.page.getByRole('link', { name: 'Logout' }),
    };
  }

  async clickSignupLogin(): Promise<void> {
    await this.safeClick(this.nav.signupLoginLink, 'Header: click Signup / Login');
  }

  async assertLoggedInAs(expectedName: string): Promise<void> {
    await this.assertTextContains(
      this.nav.loggedInAsText,
      expectedName,
      `Header: assert Logged in as "${expectedName}"`,
    );
  }

  async clickDeleteAccount(): Promise<void> {
    await this.safeClick(this.nav.deleteAccountLink, 'Header: click Delete Account');
  }

  async assertSignupLoginVisible(): Promise<void> {
    await this.waiter.waitVisible(this.nav.signupLoginLink);
  }

  async clickLogout(): Promise<void> {
    await this.safeClick(this.nav.logoutLink, 'Header: click Logout');
  }

  async logoutVisible(): Promise<void> {
    await this.waiter.waitVisible(this.nav.logoutLink);
  }

  async assertLoggedInAsVisible(): Promise<void> {
    await this.waiter.waitVisible(this.nav.loggedInAsText);
  }

  async assertNotLoggedIn(): Promise<void> {
    await this.waiter.waitHidden(this.nav.loggedInAsText);
    await this.waiter.waitHidden(this.nav.deleteAccountLink);
  }
}
