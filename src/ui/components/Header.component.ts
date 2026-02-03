import type { Page, Locator } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';

export class HeaderComponent {
  private readonly nav: {
    signupLoginLink: Locator;
    loggedInAsText: Locator;
    deleteAccountLink: Locator;
  };

  constructor(
    private readonly page: Page,
    private readonly _config: LoadedConfig,
    private readonly waiter: Waiter,
    private readonly logger: Logger,
  ) {
    this.nav = {
      signupLoginLink: page.getByRole('link', { name: 'Signup / Login' }),
      loggedInAsText: page.getByText('Logged in as', { exact: false }),
      deleteAccountLink: page.getByRole('link', { name: 'Delete Account' }),
    };
  }

  async clickSignupLogin(): Promise<void> {
    this.logger.info('Header: click Signup / Login');
    const link = this.nav.signupLoginLink;
    await this.waiter.waitVisible(link);
    await link.click();
  }

  async assertLoggedInAs(expectedName: string): Promise<void> {
    this.logger.info(`Header: assert Logged in as "${expectedName}"`);
    const logged = this.nav.loggedInAsText;
    await this.waiter.waitVisible(logged);
    await this.waiter.waitText(logged, expectedName);
  }

  async clickDeleteAccount(): Promise<void> {
    this.logger.info('Header: click Delete Account');
    const link = this.nav.deleteAccountLink;
    await this.waiter.waitVisible(link);
    await link.click();
  }

  async assertSignupLoginVisible(): Promise<void> {
    this.logger.info('Header: assert Signup / Login visible');
    await this.waiter.waitVisible(this.nav.signupLoginLink);
  }
}
