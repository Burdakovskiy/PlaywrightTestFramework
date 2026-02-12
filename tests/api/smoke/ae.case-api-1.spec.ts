import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke ${AE_ROUTES.productsList}`, () => {
  test('Get All Products List', async ({ aeApi }) => {
    const response = await aeApi.getProductList();
    ApiAssertions.productListOk(response);
  });
});
