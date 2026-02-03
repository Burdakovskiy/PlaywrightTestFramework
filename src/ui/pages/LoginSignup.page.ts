import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';

export class LoginSignupPage extends BasePage {
  private readonly signup: {
    newUserTitle: Locator;
    nameInput: Locator;
    emailInput: Locator;
    submitButton: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.signup = {
      newUserTitle: this.page.getByText('New User Signup!', { exact: true }),
      nameInput: this.page.getByPlaceholder('Name'),
      emailInput: this.page.locator('form[action="/signup"] input[data-qa="signup-email"]'),
      submitButton: this.page.getByRole('button', { name: 'Signup' }),
    };
  }

  async fillSignupName(name: string): Promise<void> {
    await this.safeFill(this.signup.nameInput, name, 'Login/Signup: fill signup name');
  }

  async fillSignupEmail(email: string): Promise<void> {
    await this.safeFill(this.signup.emailInput, email, 'Login/Signup: fill signup email');
  }

  async clickSignupSubmit(): Promise<void> {
    await this.safeClick(this.signup.submitButton, 'Login/Signup: click Signup submit');
  }

  async assertNewUserSignupVisible(): Promise<void> {
    this.logger.info('Login/Signup: assert New User Signup visible');
    await this.waiter.waitVisible(this.signup.newUserTitle);
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.fillSignupName(name);
    await this.fillSignupEmail(email);
    await this.clickSignupSubmit();
  }
}
