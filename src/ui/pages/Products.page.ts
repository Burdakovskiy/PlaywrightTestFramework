import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';
import { CartPage } from './Cart.page';

export class ProductsPage extends BasePage {
  private readonly itemsRoot: Locator;
  private readonly items: {
    title: Locator;
    productLink: Locator;
  };

  private readonly cartModal: {
    root: Locator;
    continueShopping: Locator;
    viewCart: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);
    this.itemsRoot = this.page.locator('.features_items');
    this.items = {
      title: this.itemsRoot.getByRole('heading', { name: 'All Products' }),
      productLink: this.itemsRoot.locator('a[href="/product_details/1"]'),
    };

    this.cartModal = {
      root: this.page.locator('#cartModal'),
      continueShopping: this.page
        .locator('#cartModal')
        .getByRole('button', { name: /Continue Shopping/i }),
      viewCart: this.page.locator('#cartModal').getByRole('link', { name: /View Cart/i }),
    };
  }

  private productCardById(id: number): Locator {
    return this.page.locator(`.single-products:has(a.add-to-cart[data-product-id="${id}"])`);
  }

  private addToCartButtonInCard(card: Locator): Locator {
    return card.locator('.product-overlay a.add-to-cart');
  }

  private async hoverOverTheProduct(card: Locator): Promise<void> {
    await card.scrollIntoViewIfNeeded();
    await card.hover();

    await this.waiter.waitVisible(this.addToCartButtonInCard(card));
  }

  async assertProductsPageVisible(): Promise<void> {
    await this.waiter.waitUrl(/\/products/);
    await this.waiter.waitVisible(this.items.title);
  }

  async assertProductExist(): Promise<void> {
    await this.waiter.waitVisible(this.items.productLink);
  }

  async clickViewProductDetails(): Promise<void> {
    await this.safeClick(this.items.productLink);
  }

  async addProductsAndProceedToCart(id: number): Promise<CartPage> {
    for (let currentId = id; currentId >= 1; currentId--) {
      const card = this.productCardById(currentId);
      await this.hoverOverTheProduct(card);
      await this.safeClick(this.addToCartButtonInCard(card), `Add to cart: productId=${currentId}`);

      const continueShopping = currentId > 1;

      await this.waiter.waitVisible(
        continueShopping ? this.cartModal.continueShopping : this.cartModal.viewCart,
      );

      if (continueShopping) {
        await this.safeClick(this.cartModal.continueShopping, 'Cart modal: Continue Shopping');
        await this.waiter.waitHidden(this.cartModal.root);
      } else {
        await this.safeClick(this.cartModal.viewCart, 'Cart modal: View Cart');
      }
    }

    const cart = new CartPage(this.page, this.config, this.waiter, this.logger);
    return cart;
  }
}
