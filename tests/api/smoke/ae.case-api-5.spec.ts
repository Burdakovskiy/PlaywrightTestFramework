import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke @contract ${AE_ROUTES.searchProduct}`, () => {
  test('POST To Search Product', async ({ aeApi }) => {
    const query = 'top';
    const res = await aeApi.searchProduct(query);
    ApiAssertions.searchProductOk(res, query);
  });
});
