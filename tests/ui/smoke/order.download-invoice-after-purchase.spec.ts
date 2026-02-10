import { test } from '../../../src/fixtures/ui.fixture';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';
import { PaymentDataFactory } from '../../../src/data/factories/PaymentData.factory';
import { DownloadInvoiceAfterPurchaseOrderFlow } from '../../../src/flows/order/DownloadInvoiceAfterPurchaseOrder.flow';

test('@smoke Download and check the invoice after purchase', async ({ ctx }) => {
  const user = UserDataFactory.createUniqueUser();
  const data = PaymentDataFactory.createPaymentData(user);
  const productsId = [1, 2];
  await DownloadInvoiceAfterPurchaseOrderFlow.run(ctx, user, data, productsId);
});
