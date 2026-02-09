import type { TestContext } from '../../fixtures/types';
import type { UserEntity } from '../../domain/UserEntity';
import type { CartPage } from '../../ui/pages/Cart.page';
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
    const header = ctx.uiRegistry.header();
    const home = ctx.uiRegistry.home();
    const products = ctx.uiRegistry.products();
    const productsCount = productsId.length;

    let cart: CartPage;

    await RegisterUserFlow.run(ctx, user);
    await LogoutFlow.run(ctx);

    await ctx.step('Open Home & verify visible', async () => {
      await header.goToHome();
      await home.assertVisible();
    });

    await ctx.step('Navigate to Products page and verify visibility', async () => {
      await header.goToProducts();
      await products.assertProductsPageVisible();
    });

    await ctx.step('Enter product name and click search button', async () => {
      await products.searchProduct(searchRequest);
      await products.verifySearching(productsCount);
    });

    await ctx.step('Add products to cart and proceed to cart', async () => {
      cart = await products.addProductsAndProceedToCart(productsId);
      await cart.assertVisible();
      await cart.assertProductsPresent(productsId);
    });

    await LoginUserFlow.run(ctx, user);

    await ctx.step('Proceed to cart and verify products', async () => {
      await header.goToCart();
      await cart.assertVisible();
      await cart.assertProductsPresent(productsId);
    });

    await DeleteAccountFlow.run(ctx);
  }
}
