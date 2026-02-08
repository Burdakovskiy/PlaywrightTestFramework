import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';
import { CheckoutPage } from './Checkout.page';

export class CartPage extends BasePage {
  private readonly cartTable = this.page.locator('#cart_info_table');
  private readonly cartRows = this.cartTable.locator('tbody tr');
  private readonly proceedToCheckoutBtn = this.page.locator('a.btn.check_out');
  private readonly registerLoginLink = this.page.getByRole('link', {
    name: /^Register\s*\/\s*Login$/i,
  });

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);
  }

  async assertVisible(): Promise<void> {
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

  async proceedToCheckout(): Promise<CheckoutPage> {
    await this.safeClick(this.proceedToCheckoutBtn, 'Cart: Proceed To Checkout');
    const checkout = new CheckoutPage(this.page, this.config, this.waiter, this.logger);
    return checkout;
  }

  async goToRegisterLogin(): Promise<void> {
    await this.safeClick(this.registerLoginLink, 'Checkout: click Register / Login');
  }
}
