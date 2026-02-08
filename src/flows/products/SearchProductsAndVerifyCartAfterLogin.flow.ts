import type { TestContext } from '../../fixtures/types';
import { ProductsPage } from '../../ui/pages/Products.page';
import { HeaderComponent } from '../../ui/components/Header.component';
import { HomePage } from '../../ui/pages/Home.page';
import type { UserEntity } from '../../domain/UserEntity';
import { RegisterUserFlow } from '../../../src/flows/auth/RegisterUser.flow';
import { DeleteAccountFlow } from '../../../src/flows/auth/DeleteAccount.flow';
import { LoginUserFlow } from '../../../src/flows/auth/LoginUser.flow';
import { LogoutFlow } from '../../../src/flows/auth/Logout.flow';

export class SearchProductsAndVerifyCartAfterLogin {
  static async run(
    ctx: TestContext,
    searchRequest: string,
    productsId: number[],
    user: UserEntity,
  ): Promise<void> {
    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const products = new ProductsPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const productsCount = productsId.length;

    await RegisterUserFlow.run(ctx, user);
    await LogoutFlow.run(ctx);

    ctx.logger.info('SearchProductsAndVerifyCartAfterLogin: Open Home & verify visible');
    await header.goToHome();
    await home.assertVisible();

    ctx.logger.info(
      'SearchProductsAndVerifyCartAfterLogin: Navigate to Products page and verify visibility',
    );
    await header.goToProducts();
    await products.assertProductsPageVisible();

    ctx.logger.info(
      'SearchProductsAndVerifyCartAfterLogin: Enter product name and click search button',
    );
    await products.searchProduct(searchRequest);
    await products.verifySearching(productsCount);

    ctx.logger.info(
      'SearchProductsAndVerifyCartAfterLogin: Add products to cart and proceed to cart',
    );
    const cart = await products.addProductsAndProceedToCart(productsId);
    await cart.assertVisible();
    await cart.assertProductsPresent(productsId);

    await LoginUserFlow.run(ctx, user);

    ctx.logger.info('SearchProductsAndVerifyCartAfterLogin: Proceed to cart and verify products');
    header.goToCart();
    await cart.assertVisible();
    await cart.assertProductsPresent(productsId);

    await DeleteAccountFlow.run(ctx);
  }
}
