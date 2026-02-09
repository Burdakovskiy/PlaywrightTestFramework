import type { TestContext } from '../../fixtures/types';
import type { UserEntity } from '../../domain/UserEntity';
import { DeleteAccountFlow } from '../auth/DeleteAccount.flow';
import { PaymentDataEntity } from '../../domain/PaymentDataEntity';

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
