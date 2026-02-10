import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';
import { CartPage } from './Cart.page';

export class ProductsPage extends BasePage {
  private readonly itemsRoot: Locator;

  private readonly items: {
    productsTitle: Locator;
    productLink: Locator;
    searchTitle: Locator;
    searchField: Locator;
    searchButton: Locator;
    products: Locator;
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
      productsTitle: this.itemsRoot.getByRole('heading', { name: 'All Products' }),
      productLink: this.itemsRoot.locator('a[href="/product_details/1"]'),
      searchTitle: this.itemsRoot.getByRole('heading', { name: 'Searched Products' }),
      searchField: this.page.getByPlaceholder('Search Product'),
      searchButton: this.page.locator('#submit_search'),
      products: this.page.locator('.features_items .product-image-wrapper'),
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

  async clickViewProductDetails(): Promise<void> {
    await this.safeClick(this.items.productLink);
  }

  async searchProduct(name: string): Promise<void> {
    await this.safeFill(this.items.searchField, name);
    await this.safeClick(this.items.searchButton);
  }

  async verifySearching(count: number): Promise<void> {
    await this.waiter.waitVisible(this.items.searchTitle);
    await this.waiter.waitCount(this.items.products, count);
  }

  async addProductsAndProceedToCart(ids: number[]): Promise<CartPage> {
    let itemCounter = 0;
    for (const currentId of ids) {
      const card = this.productCardById(currentId);
      await this.hoverOverTheProduct(card);
      await this.safeClick(this.addToCartButtonInCard(card), `Add to cart: productId=${currentId}`);
      itemCounter++;

      const isLast = ids.length == itemCounter;

      await this.waiter.waitVisible(
        isLast ? this.cartModal.continueShopping : this.cartModal.viewCart,
      );

      if (isLast) {
        await this.safeClick(this.cartModal.viewCart, 'Cart modal: View Cart');
      } else {
        await this.safeClick(this.cartModal.continueShopping, 'Cart modal: Continue Shopping');
        await this.waiter.waitHidden(this.cartModal.root);
      }
    }

    const cart = new CartPage(this.page, this.config, this.waiter, this.logger);
    return cart;
  }

  async assertProductsPageVisible(): Promise<void> {
    await this.waiter.waitUrl(/\/products/);
    await this.waiter.waitVisible(this.items.productsTitle);
  }

  async assertProductExist(): Promise<void> {
    await this.waiter.waitVisible(this.items.productLink);
  }
}
