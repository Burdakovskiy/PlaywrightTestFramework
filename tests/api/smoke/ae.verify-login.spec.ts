import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';

test('POST /api/verifyLogin returns responseCode+message (negative)', async ({ aeApi }) => {
  const res = await aeApi.verifyLogin('fake@example.com', 'wrong-pass');
  ApiAssertions.verifyLoginHasResponseCode(res);
});
