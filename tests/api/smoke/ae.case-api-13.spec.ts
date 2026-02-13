import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';

test.describe(`@api @smoke @contract ${AE_ROUTES.updateAccount}`, () => {
  test('PUT METHOD To Update User Account', async ({ aeApi }) => {
    const user = UserDataFactory.createUniqueUser();
    const created = await aeApi.createAccount(user);
    ApiAssertions.createAccountShould201(created);

    try {
      const unpdated = await aeApi.updateAccount(user);
      ApiAssertions.updateAccountShould200(unpdated);
    } finally {
      const deleted = await aeApi.deleteAccount(user.email, user.password);
      ApiAssertions.deleteAccountShould200(deleted);
    }
  });
});
