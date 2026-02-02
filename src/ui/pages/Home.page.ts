import { BasePage } from '../base/BasePage';
import { homeLocators } from '../locators/home.locators';
import { HeaderComponent } from '../components/Header.component';

export class HomePage extends BasePage {
  header(): HeaderComponent {
    return new HeaderComponent(this.page, this.config, this.waiter, this.logger);
  }

  async openHome(): Promise<void> {
    await this.open('/');
  }

  async assertVisible(): Promise<void> {
    this.logger.info('Home: assert visible');
    await this.waiter.waitVisible(homeLocators.body(this.page));
    await this.waiter.waitVisible(homeLocators.signupLoginLink(this.page));
  }
}
