import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke @negative ${AE_ROUTES.brandsList}`, () => {
  test('PUT To All Brands List', async ({ aeApi }) => {
    const response = await aeApi.putToAllBrandsList();
    ApiAssertions.brandsListPutShould405(response);
  });
});
