import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';
import { CheckoutPage } from './Checkout.page';

export class CartPage extends BasePage {
  private readonly cartTable: Locator;

  private readonly elements: {
    cartRows: Locator;
    proceedToCheckoutBtn: Locator;
    registerLoginLink: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.cartTable = this.page.locator('#cart_info_table');
    this.elements = {
      cartRows: this.cartTable.locator('tbody tr'),
      proceedToCheckoutBtn: this.page.locator('a.btn.check_out'),
      registerLoginLink: this.page.getByRole('link', {
        name: /^Register\s*\/\s*Login$/i,
      }),
    };
  }

  async proceedToCheckout(): Promise<CheckoutPage> {
    await this.safeClick(this.elements.proceedToCheckoutBtn, 'Cart: Proceed To Checkout');
    const checkout = new CheckoutPage(this.page, this.config, this.waiter, this.logger);
    return checkout;
  }

  async goToRegisterLogin(): Promise<void> {
    await this.safeClick(this.elements.registerLoginLink, 'Checkout: click Register / Login');
  }

  async assertVisible(): Promise<void> {
    await this.waiter.waitUrl(/\/view_cart/);
    await this.waiter.waitVisible(this.cartTable);
  }

  async assertProductsPresent(productsId: number[]): Promise<void> {
    await this.waiter.waitVisible(this.elements.cartRows.first());
    await this.waiter.waitCount(this.elements.cartRows, productsId.length);
    for (const currentId of productsId) {
      const row = this.cartTable.locator(`tbody tr#product-${currentId}`);
      await this.waiter.waitVisible(row);
    }
  }
}
