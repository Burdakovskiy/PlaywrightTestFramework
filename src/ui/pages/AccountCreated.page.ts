import { BasePage } from '../base/BasePage';
import { accountCreatedLocators } from '../locators/accountCreated.locators';

export class AccountCreatedPage extends BasePage {
  async assertAccountCreatedVisible(): Promise<void> {
    this.logger.info('AccountCreated: assert ACCOUNT CREATED visible');
    await this.waiter.waitVisible(accountCreatedLocators.accountCreatedTitle(this.page));
  }

  async continue(): Promise<void> {
    this.logger.info('AccountCreated: click Continue');
    await this.safeClick(accountCreatedLocators.continueButton(this.page), 'Click Continue');
  }
}
