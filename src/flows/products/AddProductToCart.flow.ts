import type { TestContext } from '../../fixtures/types';
import type { CartPage } from '../../ui/pages/Cart.page';

export class AddProductToCartFlow {
  static async run(ctx: TestContext, productsId: number[]): Promise<void> {
    const header = ctx.uiRegistry.header();
    const home = ctx.uiRegistry.home();
    const products = ctx.uiRegistry.products();

    let cart: CartPage;

    await ctx.step('Open Home & verify visible', async () => {
      await header.goToHome();
      await home.assertVisible();
    });
    await ctx.step('Navigate to Products page and verify visibility', async () => {
      await header.goToProducts();
      await products.assertProductsPageVisible();
    });
    await ctx.step('Add products to cart and proceed to cart', async () => {
      cart = await products.addProductsAndProceedToCart(productsId);
    });
    await ctx.step('Verify cart visibility', async () => {
      await cart.assertVisible();
      await cart.assertProductsPresent(productsId);
    });
  }
}
