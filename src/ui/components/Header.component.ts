import type { Page, Locator } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BaseComponent } from '../base/BaseComponent';

export class HeaderComponent extends BaseComponent {
  private readonly nav: {
    signupLoginLink: Locator;
    loggedInAsText: Locator;
    deleteAccountLink: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);
    this.nav = {
      signupLoginLink: this.page.getByRole('link', { name: 'Signup / Login' }),
      loggedInAsText: this.page.getByText('Logged in as', { exact: false }),
      deleteAccountLink: this.page.getByRole('link', { name: 'Delete Account' }),
    };
  }

  async clickSignupLogin(): Promise<void> {
    await this.click(this.nav.signupLoginLink, 'Header: click Signup / Login');
  }

  async assertLoggedInAs(expectedName: string): Promise<void> {
    await this.assertTextContains(
      this.nav.loggedInAsText,
      expectedName,
      `Header: assert Logged in as "${expectedName}"`,
    );
  }

  async clickDeleteAccount(): Promise<void> {
    await this.click(this.nav.deleteAccountLink, 'Header: click Delete Account');
  }

  async assertSignupLoginVisible(): Promise<void> {
    await this.waitVisible(this.nav.signupLoginLink, 'Header: assert Signup / Login visible');
  }
}
