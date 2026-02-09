import { test } from '../../../src/fixtures/test.fixture';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';
import { PaymentDataFactory } from '../../../src/data/factories/PaymentData.factory';
import { DownloadInvoiceAfterPurchaseOrderFlow } from '../../../src/flows/order/DownloadInvoiceAfterPurchaseOrder.flow';

test('@smoke Download invoice after purchase order and check the invoice', async ({ ctx }) => {
  const user = UserDataFactory.createUniqueUser();
  const data = PaymentDataFactory.createPaymentData(user);
  const productsId = [1, 2];
  await DownloadInvoiceAfterPurchaseOrderFlow.run(ctx, user, data, productsId);
});
