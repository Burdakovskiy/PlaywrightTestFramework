import { test } from '../../../src/fixtures/test.fixture';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';
import { PaymentDataFactory } from '../../../src/data/factories/PaymentData.factory';
import { PlaceOrderRegisterWhileCheckoutFlow } from '../../../src/flows/order/PlaceOrderRegisterWhileCheckout.flow';

test('@smoke place order register while checkout flow', async ({ ctx }) => {
  const user = UserDataFactory.createUniqueUser();
  const data = PaymentDataFactory.createPaymentData(user);
  await PlaceOrderRegisterWhileCheckoutFlow.run(ctx, user, data);
});
