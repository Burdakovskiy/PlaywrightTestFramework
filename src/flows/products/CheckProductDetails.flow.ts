import type { TestContext } from '../../fixtures/types';

export class CheckProductDetails {
  static async run(ctx: TestContext): Promise<void> {
    const header = ctx.uiRegistry.header();
    const home = ctx.uiRegistry.home();
    const products = ctx.uiRegistry.products();
    const details = ctx.uiRegistry.productDetails();

    ctx.logger.info('TEST: Open Home & verify visible');
    await header.goToHome();
    await home.assertVisible();

    ctx.logger.info('TEST: Navigate to Products page and verify visibility');
    await header.goToProducts();
    await products.assertProductsPageVisible();

    ctx.logger.info('TEST: Verify product exist and click view product button');
    await products.assertProductExist();
    await products.clickViewProductDetails();
    await details.assertProductDetailPageVisible();

    ctx.logger.info('TEST: Verify product details elements');
    await details.assertDetailsElementsExist();
  }
}
