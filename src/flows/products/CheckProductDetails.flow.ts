import type { TestContext } from '../../fixtures/types';

export class CheckProductDetails {
  static async run(ctx: TestContext): Promise<void> {
    const header = ctx.uiRegistry.header();
    const home = ctx.uiRegistry.home();
    const products = ctx.uiRegistry.products();
    const details = ctx.uiRegistry.productDetails();

    await ctx.step('Open Home & verify visible', async () => {
      await header.goToHome();
      await home.assertVisible();
    });
    await ctx.step('Navigate to Products page and verify visibility', async () => {
      await header.goToProducts();
      await products.assertProductsPageVisible();
    });
    await ctx.step('Verify product exist and click view product button', async () => {
      await products.assertProductExist();
      await products.clickViewProductDetails();
      await details.assertProductDetailPageVisible();
    });
    await ctx.step('Verify product details elements', async () => {
      await details.assertDetailsElementsExist();
    });
  }
}
