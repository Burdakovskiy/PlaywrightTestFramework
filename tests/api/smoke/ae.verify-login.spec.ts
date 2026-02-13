import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';

test.describe('@api @smoke @negative', () => {
  test('POST /api/verifyLogin returns responseCode+message', async ({ aeApi }) => {
    const res = await aeApi.verifyLogin('fake@example.com', 'wrong-pass');
    ApiAssertions.verifyLoginHasResponseCode(res);
  });
});
