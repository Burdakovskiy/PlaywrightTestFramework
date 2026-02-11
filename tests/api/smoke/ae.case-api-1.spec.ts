import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';

test.describe('@api @smoke', () => {
  test('Get All Products List /api/productsList', async ({ aeApi }) => {
    const response = await aeApi.getProductList();
    ApiAssertions.productListOk(response);
  });
});
