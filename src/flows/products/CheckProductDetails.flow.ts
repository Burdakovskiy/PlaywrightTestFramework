import type { TestContext } from '../../fixtures/types';
import { HomePage } from '../../../src/ui/pages/Home.page';
import { ProductsPage } from '../../../src/ui/pages/Products.page';
import { ProductDetailsPage } from '../../../src/ui/pages/ProductDetails.page';

export class CheckProductDetails {
  static async run(ctx: TestContext): Promise<void> {
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const products = new ProductsPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const details = new ProductDetailsPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    ctx.logger.info('TEST: Open Home & verify visible');
    await home.openHome();
    await home.assertVisible();

    ctx.logger.info('TEST: Navigate to Products page and verify visibility');
    await home.goToProducts();
    await products.assertProductsPageVisible();

    ctx.logger.info('TEST: Verify product exist and click view product button');
    await products.assertProductExist();
    await products.clickViewProduct();
    await details.assertProductDetailPageVisible();

    ctx.logger.info('TEST: Verify product details elements');
    await details.assertDetailsElementsExist();
  }
}
