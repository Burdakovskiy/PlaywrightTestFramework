import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke @contract ${AE_ROUTES.brandsList}`, () => {
  test('Get All Brands List', async ({ aeApi }) => {
    const response = await aeApi.getAllBrandsList();
    ApiAssertions.brandsListOk(response);
  });
});
