import { test } from '../../../src/fixtures/test.fixture';
import { SearchProductsAndVerifyCartAfterLogin } from '../../../src/flows/products/SearchProductsAndVerifyCartAfterLogin.flow';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';

test('@smoke Search products and verify cart after login', async ({ ctx }) => {
  const searchRequest = 'blue cotton';
  const expectedProductsId = [21, 41];
  const user = UserDataFactory.createUniqueUser();

  await SearchProductsAndVerifyCartAfterLogin.run(ctx, searchRequest, expectedProductsId, user);
});
