import { expect, type Locator, type Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';

export class ProductDetailsPage extends BasePage {
  private readonly elementRoot: Locator;
  private readonly elements: {
    name: Locator;
    price: Locator;
    categort: Locator;
    availability: Locator;
  };
  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);
    this.elementRoot = this.page.locator('.product-information');
    this.elements = {
      name: this.elementRoot.getByRole('heading', { name: 'Blue Top' }),
      price: this.elementRoot.locator('span', { hasText: /^Rs\.\s*500$/ }),
      categort: this.elementRoot.locator('p', { hasText: 'Category: Women > Tops' }),
      availability: this.elementRoot.locator('p', { hasText: 'Availability: In Stock' }),
    };
  }

  async assertProductDetailPageVisible(): Promise<void> {
    await this.waiter.waitUrl(/\/product_details\//);
  }

  async assertDetailsElementsExist(): Promise<void> {
    await this.waiter.waitVisible(this.elements.name);
    await this.waiter.waitVisible(this.elements.price);
    await this.waiter.waitVisible(this.elements.categort);
    await this.waiter.waitVisible(this.elements.availability);
  }
}
