import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke @negative ${AE_ROUTES.productsList}`, () => {
  test('POST To All Products List', async ({ aeApi }) => {
    const res = await aeApi.postToAllProductsList();
    ApiAssertions.productListPostShould405(res);
  });
});
