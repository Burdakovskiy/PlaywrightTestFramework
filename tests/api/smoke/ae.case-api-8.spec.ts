import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';

test.describe(`@api @smoke @negative ${AE_ROUTES.verifyLogin}`, () => {
  test('POST To Verify Login without email parameter', async ({ aeApi }) => {
    const verified = await aeApi.verifyLoginWithoutEmail('password');
    ApiAssertions.verifyLoginMissingEmailShould400(verified);
  });
});
