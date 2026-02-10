import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';

test('POST /api/searchProduct returns products for query', async ({ aeApi }) => {
  const query = 'top';
  const res = await aeApi.searchProduct(query);
  ApiAssertions.searchProductOk(res, query);
});
