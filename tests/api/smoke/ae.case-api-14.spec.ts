import { test } from '../../../src/fixtures/api.fixtures';
import { ApiAssertions } from '../../../src/api/assertions/ae.assertions';
import { AE_ROUTES } from '../../../src/api/routes/ae.routes';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';

test.describe(`@api @smoke @contract ${AE_ROUTES.getUserDetailByEmail}`, () => {
  test('GET user account detail by email', async ({ aeApi }) => {
    const user = UserDataFactory.createUniqueUser();
    const created = await aeApi.createAccount(user);
    ApiAssertions.createAccountShould201(created);

    try {
      const details = await aeApi.getUserDetailByEmail(user.email);
      ApiAssertions.getUserDetailByEmailShould200(details, user.email);
    } finally {
      const deleted = await aeApi.deleteAccount(user.email, user.password);
      ApiAssertions.deleteAccountShould200(deleted);
    }
  });
});
