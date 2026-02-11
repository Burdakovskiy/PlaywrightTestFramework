import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';

test.describe('@api @smoke', () => {
  test('POST To All Products List /api/productsList', async ({ aeApi }) => {
    const res = await aeApi.postToAllProductsList();
    ApiAssertions.productListPostShould405(res);
  });
});
