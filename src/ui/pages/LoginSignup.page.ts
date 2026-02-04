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

  private readonly login: {
    loginTitle: Locator;
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
  };

  private readonly loginError: Locator;

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.signup = {
      newUserTitle: this.page.getByText('New User Signup!', { exact: true }),
      nameInput: this.page.getByPlaceholder('Name'),
      emailInput: this.page.locator('form[action="/signup"] input[data-qa="signup-email"]'),
      submitButton: this.page.getByRole('button', { name: 'Signup' }),
    };

    this.login = {
      loginTitle: this.page.getByText('Login to your account', { exact: true }),
      emailInput: this.page.locator('form[action="/login"] input[data-qa="login-email"]'),
      passwordInput: this.page.getByPlaceholder('Password'),
      loginButton: this.page.getByRole('button', { name: 'Login' }),
    };
    this.loginError = this.page.getByText('Your email or password is incorrect!', { exact: true });
  }

  async fillSignupName(name: string): Promise<void> {
    await this.safeFill(this.signup.nameInput, name, 'Login/Signup: fill signup name');
  }

  async fillSignupEmail(email: string): Promise<void> {
    await this.safeFill(this.signup.emailInput, email, 'Signup: fill signup email');
  }

  async fillLoginEmail(email: string): Promise<void> {
    await this.safeFill(this.login.emailInput, email, 'Login: fill login email');
  }

  async fillLoginPassword(password: string): Promise<void> {
    await this.safeFill(this.login.passwordInput, password, 'Password: fill login password');
  }

  async clickSignupSubmit(): Promise<void> {
    await this.safeClick(this.signup.submitButton, 'Signup: click Signup submit');
  }

  async clickLoginSubmit(): Promise<void> {
    await this.safeClick(this.login.loginButton, 'Login: click Login submit');
  }

  async assertNewUserSignupVisible(): Promise<void> {
    this.logger.info('Signup: assert New User Signup visible');
    await this.waiter.waitVisible(this.signup.newUserTitle);
  }

  async assertLoginToYourAccountVisible(): Promise<void> {
    this.logger.info('Login: assert Login To Your Account visible');
    await this.waiter.waitVisible(this.login.loginTitle);
  }

  async startSignup(name: string, email: string): Promise<void> {
    await this.fillSignupName(name);
    await this.fillSignupEmail(email);
    await this.clickSignupSubmit();
  }

  async startLogin(email: string, password: string): Promise<void> {
    await this.fillLoginEmail(email);
    await this.fillLoginPassword(password);
    await this.clickLoginSubmit();
  }

  async assertLoginErrorVisible(expectedText?: string): Promise<void> {
    if (expectedText) {
      await this.waiter.waitVisible(this.page.getByText(expectedText, { exact: true }));
      return;
    }
    await this.waiter.waitVisible(this.loginError);
  }
}
