import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';

test.describe('@api @smoke', () => {
  test('PUT To All Brands List /api/brandsList', async ({ aeApi }) => {
    const response = await aeApi.putToAllBrandsList();
    ApiAssertions.brandsListPutShould405(response);
  });
});
