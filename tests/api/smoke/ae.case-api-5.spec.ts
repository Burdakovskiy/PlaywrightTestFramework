import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';

test.describe('@api @smoke', () => {
  test('POST To Search Product /api/searchProduct', async ({ aeApi }) => {
    const query = 'top';
    const res = await aeApi.searchProduct(query);
    ApiAssertions.searchProductOk(res, query);
  });
});
