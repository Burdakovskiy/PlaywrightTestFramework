import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';

test.describe('@api @smoke', () => {
  test('Get All Brands List /api/brandsList', async ({ aeApi }) => {
    const response = await aeApi.getAllBrandsList();
    ApiAssertions.brandsListOk(response);
  });
});
