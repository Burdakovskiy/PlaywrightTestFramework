import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';

test.describe(`@api @smoke ${AE_ROUTES.createAccount}`, () => {
  test('Create account', async ({ aeApi }) => {
    const user = UserDataFactory.createUniqueUser();
    const response = await aeApi.createAccount(user);
    ApiAssertions.createAccountShould201(response);
  });
});
