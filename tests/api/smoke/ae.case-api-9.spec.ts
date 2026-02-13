import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke @negative ${AE_ROUTES.verifyLogin}`, () => {
  test('DELETE To Verify Login', async ({ aeApi }) => {
    const verified = await aeApi.deleteToVerifyLogin();
    ApiAssertions.verifyLoginDeleteShould405(verified);
  });
});
