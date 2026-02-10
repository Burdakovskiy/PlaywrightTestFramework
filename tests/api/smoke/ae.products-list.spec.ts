import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';

test('GET /api/productsList returns products', async ({ aeApi }) => {
  const response = await aeApi.getProductList();
  ApiAssertions.productListOk(response);
});
