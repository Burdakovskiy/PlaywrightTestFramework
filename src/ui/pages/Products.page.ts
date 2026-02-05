import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';

export class ProductsPage extends BasePage {
  private readonly itemsRoot: Locator;
  private readonly items: {
    title: Locator;
    productLink: Locator;
  };
  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);
    this.itemsRoot = this.page.locator('.features_items');
    this.items = {
      title: this.itemsRoot.getByRole('heading', { name: 'All Products' }),
      productLink: this.itemsRoot.locator('a[href="/product_details/1"]'),
    };
  }

  async assertProductsPageVisible(): Promise<void> {
    await this.waiter.waitUrl(/\/products/);
    await this.waiter.waitVisible(this.items.title);
  }

  async assertProductExist(): Promise<void> {
    await this.waiter.waitVisible(this.items.productLink);
  }

  async clickViewProduct(): Promise<void> {
    await this.safeClick(this.items.productLink);
  }
}
