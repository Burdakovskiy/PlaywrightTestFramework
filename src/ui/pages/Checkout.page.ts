import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';
import { PaymentPage } from './Payment.page';

export class CheckoutPage extends BasePage {
  private readonly checkoutElements: {
    addressDetails: Locator;
    deliveryAddress: Locator;
    billingAddress: Locator;
    commentField: Locator;
    placeOrderButton: Locator;
  };
  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.checkoutElements = {
      addressDetails: this.page.getByRole('heading', { name: /Address Details/i }),
      deliveryAddress: this.page.getByRole('heading', { name: /delivery address/i }),
      billingAddress: this.page.getByRole('heading', { name: /billing address/i }),
      commentField: this.page.locator('textarea[name="message"]'),
      placeOrderButton: this.page.getByRole('link', { name: /place order/i }),
    };
  }

  async fillInOrderComment(comment: string): Promise<void> {
    await this.safeFill(this.checkoutElements.commentField, comment);
  }

  async proceedToPayment(): Promise<PaymentPage> {
    await this.safeClick(this.checkoutElements.placeOrderButton);
    const payments = new PaymentPage(this.page, this.config, this.waiter, this.logger);
    return payments;
  }

  async assertVisible(): Promise<void> {
    await this.waiter.waitUrl(/\/checkout/);
    await Promise.all([
      this.waiter.waitVisible(this.checkoutElements.addressDetails),
      this.waiter.waitVisible(this.checkoutElements.deliveryAddress),
      this.waiter.waitVisible(this.checkoutElements.billingAddress),
      this.waiter.waitVisible(this.checkoutElements.commentField),
    ]);
  }
}
