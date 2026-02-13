import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke @negative ${AE_ROUTES.verifyLogin}`, () => {
  test('POST To Verify Login with invalid details', async ({ aeApi }) => {
    const verified = await aeApi.verifyLogin('email', 'password');
    ApiAssertions.verifyLoginInvalidCredsShould404(verified);
  });
});
