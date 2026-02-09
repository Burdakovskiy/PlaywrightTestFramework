import type { TestContext } from '../../fixtures/types';
import type { UserEntity } from '../../domain/UserEntity';
import { DeleteAccountFlow } from '../auth/DeleteAccount.flow';
import { PaymentDataEntity } from '../../domain/PaymentDataEntity';
import type { CartPage } from '../../ui/pages/Cart.page';
import type { CheckoutPage } from '../../ui/pages/Checkout.page';
import type { PaymentPage } from '../../ui/pages/Payment.page';
import type { OrderPlacedPage } from '../../ui/pages/OrderPlaced.page';

export class DownloadInvoiceAfterPurchaseOrderFlow {
  static async run(
    ctx: TestContext,
    user: UserEntity,
    data: PaymentDataEntity,
    productsId: number[],
  ): Promise<void> {
    const header = ctx.uiRegistry.header();
    const home = ctx.uiRegistry.home();
    const products = ctx.uiRegistry.products();
    const login = ctx.uiRegistry.loginSignup();
    const signup = ctx.uiRegistry.signupAccount();
    const created = ctx.uiRegistry.accountCreated();

    let cart: CartPage;
    let checkout: CheckoutPage;
    let payment: PaymentPage;
    let placeOrder: OrderPlacedPage;

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

    await ctx.step('Verify cart visibility and proceed to checkout -> login', async () => {
      await cart.assertVisible();
      await cart.proceedToCheckout();
      await cart.goToRegisterLogin();
    });

    await ctx.step('Signup new user and verify creation', async () => {
      await login.assertNewUserSignupVisible();
      await login.startSignup(user.name, user.email);
      await signup.completeSignup(user, user.address);
      await created.assertAccountCreatedVisible();
    });

    await ctx.step('Proceed to cart and Proceed To Checkout', async () => {
      await header.goToCart();
      checkout = await cart.proceedToCheckout();
    });

    await ctx.step('Verify Checkout visibility, fill in comment form and proceed', async () => {
      await checkout.assertVisible();
      await checkout.fillInOrderComment(data.orderComment);
      payment = await checkout.proceedToPayment();
    });

    await ctx.step(
      'Verify Payment visibility, fill in comment payment data and proceed',
      async () => {
        await payment.assertVisible();
        await payment.fillPaymentData(data);
        placeOrder = await payment.payAndConfirm();
      },
    );

    await ctx.step('Verify order placement success', async () => {
      await placeOrder.assertVisible();
    });

    await ctx.step('Download invoice', async () => {
      const downloadedFile = await placeOrder.downloadInvoice();
      await placeOrder.assertInvoiceDownloaded(downloadedFile);
    });

    await ctx.step('Delete account', async () => {
      await placeOrder.continue();
      await DeleteAccountFlow.run(ctx);
    });
  }
}
