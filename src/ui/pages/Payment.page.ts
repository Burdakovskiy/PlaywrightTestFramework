import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';
import type { PaymentDataEntity } from '../../domain/PaymentDataEntity';
import { OrderPlacedPage } from './OrderPlaced.page';

export class PaymentPage extends BasePage {
  private readonly paymentDataElements: {
    title: Locator;
    nameOnCard: Locator;
    cardNumber: Locator;
    cvc: Locator;
    expirationMonth: Locator;
    expirationYear: Locator;
    payAndConfirmButton: Locator;
  };
  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.paymentDataElements = {
      title: this.page.getByRole('heading', { name: /Payment/i }),
      nameOnCard: this.page.locator('input[name="name_on_card"]'),
      cardNumber: this.page.locator('input[name="card_number"]'),
      cvc: this.page.locator('input[name="cvc"]'),
      expirationMonth: this.page.locator('input[name="expiry_month"]'),
      expirationYear: this.page.locator('input[name="expiry_year"]'),
      payAndConfirmButton: this.page.getByRole('button', { name: 'Pay and Confirm Order' }),
    };
  }

  async fillPaymentData(data: Omit<PaymentDataEntity, 'orderComment'>): Promise<void> {
    await this.safeFill(this.paymentDataElements.nameOnCard, data.nameOnCard);
    await this.safeFill(this.paymentDataElements.cardNumber, data.cardNumber);
    await this.safeFill(this.paymentDataElements.cvc, data.cvc);
    await this.safeFill(this.paymentDataElements.expirationMonth, data.expirationMonth);
    await this.safeFill(this.paymentDataElements.expirationYear, data.expirationYear);
  }

  async payAndConfirm(): Promise<OrderPlacedPage> {
    await this.safeClick(this.paymentDataElements.payAndConfirmButton);
    const orderPlaced = new OrderPlacedPage(this.page, this.config, this.waiter, this.logger);
    return orderPlaced;
  }

  async assertVisible(): Promise<void> {
    await this.waiter.waitUrl(/\/payment/);
    await this.waiter.waitVisible(this.paymentDataElements.payAndConfirmButton);
  }
}
