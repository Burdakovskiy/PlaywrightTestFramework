import type { Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class OrderPlacedPage extends BasePage {
  private readonly title: Locator = this.page.getByRole('heading', { name: /ORDER PLACED!/i });
  private readonly continueBtn: Locator = this.page.getByRole('link', { name: /Continue/i });

  async assertVisible(): Promise<void> {
    await this.waiter.waitVisible(this.title);
  }

  async continue(): Promise<void> {
    await this.safeClick(this.continueBtn, 'OrderPlaced: Continue');
  }
}
