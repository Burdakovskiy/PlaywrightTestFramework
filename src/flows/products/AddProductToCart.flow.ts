import type { TestContext } from '../../fixtures/types';
import { ProductsPage } from '../../../src/ui/pages/Products.page';
import { HeaderComponent } from '../../../src/ui/components/Header.component';
import { CartPage } from '../../../src/ui/pages/Cart.page';
import { HomePage } from '../../ui/pages/Home.page';

export class AddProductToCartFlow {
  static async run(ctx: TestContext): Promise<void> {
    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const products = new ProductsPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    ctx.logger.info('AddProductToCartFlow: Open Home & verify visible');
    await header.goToHome();
    await home.assertVisible();

    ctx.logger.info('AddProductToCartFlow: Navigate to Products page and verify visibility');
    await header.goToProducts();
    await products.assertProductsPageVisible();

    ctx.logger.info('AddProductToCartFlow: Add products to cart and proceed to cart');
    const productsCountToAddToCart = 2;
    const cart = await products.addProductsAndProceedToCart(productsCountToAddToCart);

    ctx.logger.info('AddProductToCartFlow: Verify cart visibility');
    cart.assertCartPageVisible();
    cart.assertProductsPresent(productsCountToAddToCart);
  }
}
