import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';

test.describe(`@api @smoke @contract ${AE_ROUTES.createAccount}`, () => {
  test('Create account', async ({ aeApi }) => {
    const user = UserDataFactory.createUniqueUser();

    try {
      const response = await aeApi.createAccount(user);
      ApiAssertions.createAccountShould201(response);
    } finally {
      const deleted = await aeApi.deleteAccount(user.email, user.password);
      ApiAssertions.deleteAccountShould200(deleted);
    }
  });
});
