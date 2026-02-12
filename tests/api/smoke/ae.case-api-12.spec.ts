import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/automationExercise.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';

test.describe(`@api @smoke ${AE_ROUTES.deleteAccount}`, () => {
  test('Delete account', async ({ aeApi }) => {
    const user = UserDataFactory.createUniqueUser();
    const created = await aeApi.createAccount(user);
    ApiAssertions.createAccountShould201(created);

    const deleted = await aeApi.deleteAccount(user.email, user.password);
    ApiAssertions.deleteAccountShould200(deleted);
  });
});
