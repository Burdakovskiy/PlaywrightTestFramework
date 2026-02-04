import { test } from '../../../src/fixtures/test.fixture';
import { UserEntityFactory } from '../../../src/data/factories/UserEntity.factory';
import { RegisterUserFlow } from '../../../src/flows/auth/RegisterUser.flow';
import { DeleteAccountFlow } from '../../../src/flows/auth/DeleteAccount.flow';

test('@smoke Register and delete user)', async ({ ctx }) => {
  const user = UserEntityFactory.createUniqueUser();

  await RegisterUserFlow.run(ctx, user);
  await DeleteAccountFlow.run(ctx);
});
