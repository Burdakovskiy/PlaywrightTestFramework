import type { TestContext } from '../../fixtures/types';

export class AddProductToCartFlow {
  static async run(ctx: TestContext, productsId: number[]): Promise<void> {
    const header = ctx.uiRegistry.header();
    const home = ctx.uiRegistry.home();
    const products = ctx.uiRegistry.products();

    ctx.logger.info('AddProductToCartFlow: Open Home & verify visible');
    await header.goToHome();
    await home.assertVisible();

    ctx.logger.info('AddProductToCartFlow: Navigate to Products page and verify visibility');
    await header.goToProducts();
    await products.assertProductsPageVisible();

    ctx.logger.info('AddProductToCartFlow: Add products to cart and proceed to cart');
    const cart = await products.addProductsAndProceedToCart(productsId);

    ctx.logger.info('AddProductToCartFlow: Verify cart visibility');
    await cart.assertVisible();
    await cart.assertProductsPresent(productsId);
  }
}
