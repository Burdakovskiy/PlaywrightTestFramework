import { BasePage } from '../base/BasePage';
import { accountDeletedLocators } from '../locators/accountDeleted.locators';

export class AccountDeletedPage extends BasePage {
  async assertAccountDeletedVisible(): Promise<void> {
    this.logger.info('AccountDeleted: assert ACCOUNT DELETED visible');
    await this.waiter.waitVisible(accountDeletedLocators.accountDeletedTitle(this.page));
  }

  async continue(): Promise<void> {
    this.logger.info('AccountDeleted: click Continue');
    await this.safeClick(accountDeletedLocators.continueButton(this.page), 'Click Continue');
  }
}
