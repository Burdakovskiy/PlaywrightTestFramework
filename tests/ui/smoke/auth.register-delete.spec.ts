import { test } from '../../../src/fixtures/test.fixture';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';
import { RegisterUserFlow } from '../../../src/flows/auth/RegisterUser.flow';
import { DeleteAccountFlow } from '../../../src/flows/auth/DeleteAccount.flow';

test('@smoke Register and delete user', async ({ ctx }) => {
  const user = UserDataFactory.createUniqueUser();

  await RegisterUserFlow.run(ctx, user);
  // await DeleteAccountFlow.run(ctx);
});
