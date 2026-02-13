import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke @negative ${AE_ROUTES.searchProduct}`, () => {
  test('POST To Search Product without search_product parameter', async ({ aeApi }) => {
    const res = await aeApi.searchProductWithoutParamener();
    ApiAssertions.searchProductWithoutParamShould400(res);
  });
});
