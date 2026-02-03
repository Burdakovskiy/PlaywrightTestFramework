import { BasePage } from '../base/BasePage';
import type { Locator } from '@playwright/test';

export class LoginSignupPage extends BasePage {
  private readonly signup: {
    newUserTitle: Locator;
    nameInput: Locator;
    emailInput: Locator;
    submitButton: Locator;
  };

  constructor(...args: ConstructorParameters<typeof BasePage>) {
    super(...args);

    this.signup = {
      newUserTitle: this.page.getByText('New User Signup!', { exact: true }),
      nameInput: this.page.getByPlaceholder('Name'),
      emailInput: this.page.locator('form[action="/signup"] input[data-qa="signup-email"]'),
      submitButton: this.page.getByRole('button', { name: 'Signup' }),
    };
  }

  async assertNewUserSignupVisible(): Promise<void> {
    this.logger.info('Login/Signup: assert New User Signup visible');
    await this.waiter.waitVisible(this.signup.newUserTitle);
  }

  async startSignup(name: string, email: string): Promise<void> {
    this.logger.info(`Login/Signup: start signup for "${email}"`);

    await this.safeFill(this.signup.nameInput, name, 'Fill signup name');
    await this.safeFill(this.signup.emailInput, email, 'Fill signup email');
    await this.safeClick(this.signup.submitButton, 'Click Signup button');
  }
}
