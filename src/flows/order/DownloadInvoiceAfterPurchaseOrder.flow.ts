import type { TestContext } from '../../fixtures/types';
import type { UserEntity } from '../../domain/UserEntity';
import { HeaderComponent } from '../../ui/components/Header.component';
import { HomePage } from '../../ui/pages/Home.page';
import { ProductsPage } from '../../ui/pages/Products.page';
import { LoginSignupPage } from '../../ui/pages/LoginSignup.page';
import { SignupAccountPage } from '../../ui/pages/SignupAccount.page';
import { AccountCreatedPage } from '../../ui/pages/AccountCreated.page';
import { DeleteAccountFlow } from '../auth/DeleteAccount.flow';
import { PaymentDataEntity } from '../../domain/PaymentDataEntity';

export class DownloadInvoiceAfterPurchaseOrderFlow {
  static async run(
    ctx: TestContext,
    user: UserEntity,
    data: PaymentDataEntity,
    productsId: number[],
  ): Promise<void> {
    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const products = new ProductsPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const signup = new SignupAccountPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const created = new AccountCreatedPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    ctx.logger.info('DownloadInvoiceAfterPurchaseOrderFlow: Open Home & verify visible');
    await header.goToHome();
    await home.assertVisible();

    ctx.logger.info(
      'DownloadInvoiceAfterPurchaseOrderFlow: Navigate to Products page and verify visibility',
    );
    await header.goToProducts();
    await products.assertProductsPageVisible();

    ctx.logger.info(
      'DownloadInvoiceAfterPurchaseOrderFlow: Add products to cart and proceed to cart',
    );
    const cart = await products.addProductsAndProceedToCart(productsId);

    ctx.logger.info(
      'DownloadInvoiceAfterPurchaseOrderFlow: Verify cart visibility and proceed to checkout -> login',
    );
    await cart.assertVisible();
    await cart.proceedToCheckout();
    await cart.goToRegisterLogin();

    ctx.logger.info('DownloadInvoiceAfterPurchaseOrderFlow: Signup new user and verify creation');
    await login.assertNewUserSignupVisible();
    await login.startSignup(user.name, user.email);
    await signup.completeSignup(user, user.address);
    await created.assertAccountCreatedVisible();

    ctx.logger.info(
      'DownloadInvoiceAfterPurchaseOrderFlow: Proceed to cart and Proceed To Checkout',
    );
    await header.goToCart();
    const checkout = await cart.proceedToCheckout();

    ctx.logger.info(
      'DownloadInvoiceAfterPurchaseOrderFlow: Verify Checkout visibility, fill in comment form and proceed',
    );
    await checkout.assertVisible();
    await checkout.fillInOrderComment(data.orderComment);
    const payment = await checkout.proceedToPayment();

    ctx.logger.info(
      'DownloadInvoiceAfterPurchaseOrderFlow: Verify Payment visibility, fill in comment payment data and proceed',
    );
    await payment.assertVisible();
    await payment.fillPaymentData(data);
    const placeOrder = await payment.payAndConfirm();

    ctx.logger.info('DownloadInvoiceAfterPurchaseOrderFlow: Verify order placement success');
    await placeOrder.assertVisible();

    ctx.logger.info('DownloadInvoiceAfterPurchaseOrderFlow: Download invoice');
    const downloadedFile = await placeOrder.downloadInvoice();
    await placeOrder.assertInvoiceDownloaded(downloadedFile);

    ctx.logger.info('DownloadInvoiceAfterPurchaseOrderFlow: Delete account');
    await placeOrder.continue();
    await DeleteAccountFlow.run(ctx);
  }
}
