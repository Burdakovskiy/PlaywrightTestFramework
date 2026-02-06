import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';

export class CartPage extends BasePage {
  private readonly cartTable = this.page.locator('#cart_info_table');
  private readonly cartRows = this.cartTable.locator('tbody tr');

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);
  }

  async assertCartPageVisible(): Promise<void> {
    await this.waiter.waitUrl(/\/view_cart/);
    await this.waiter.waitVisible(this.cartTable);
  }

  async assertProductsPresent(productCount: number): Promise<void> {
    for (let currentId = productCount; currentId > 1; currentId--) {
      await this.waiter.waitVisible(this.cartRows.first());
      await this.waiter.waitCount(this.cartRows, currentId);
      const row = this.cartTable.locator(`tbody tr#product-${currentId}`);
      await this.waiter.waitVisible(row);
    }
  }
}
