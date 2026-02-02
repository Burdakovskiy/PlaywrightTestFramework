import { BasePage } from '../base/BasePage';
import { loginSignupLocators } from '../locators/loginSignup.locators';

export class LoginSignupPage extends BasePage {
  async assertNewUserSignupVisible(): Promise<void> {
    this.logger.info('Login/Signup: assert New User Signup visible');
    await this.waiter.waitVisible(loginSignupLocators.newUserSignupTitle(this.page));
  }

  async startSignup(name: string, email: string): Promise<void> {
    this.logger.info(`Login/Signup: start signup for "${email}"`);

    await this.safeFill(loginSignupLocators.signupNameInput(this.page), name, 'Fill signup name');
    await this.safeFill(
      loginSignupLocators.signupEmailInput(this.page),
      email,
      'Fill signup email',
    );
    await this.safeClick(loginSignupLocators.signupButton(this.page), 'Click Signup button');
  }
}
