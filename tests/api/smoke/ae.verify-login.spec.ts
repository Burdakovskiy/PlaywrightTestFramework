import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke @negative @contract ${AE_ROUTES.verifyLogin}`, () => {
  test('POST returns responseCode+message', async ({ aeApi }) => {
    const res = await aeApi.verifyLogin('fake@example.com', 'wrong-pass');
    ApiAssertions.verifyLoginHasResponseCode(res);
  });
});
