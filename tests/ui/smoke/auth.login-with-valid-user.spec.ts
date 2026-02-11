import { test } from '../../../src/fixtures/ui.fixture';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';
import { RegisterUserFlow } from '../../../src/flows/auth/RegisterUser.flow';
import { DeleteAccountFlow } from '../../../src/flows/auth/DeleteAccount.flow';
import { LoginUserFlow } from '../../../src/flows/auth/LoginUser.flow';
import { LogoutFlow } from '../../../src/flows/auth/Logout.flow';

test.describe('@ui @smoke', () => {
  test('Login user with correct email and password', async ({ ctx }) => {
    const user = UserDataFactory.createUniqueUser();

    await RegisterUserFlow.run(ctx, user);

    await LogoutFlow.run(ctx);
    await LoginUserFlow.run(ctx, user);

    await DeleteAccountFlow.run(ctx);
  });
});
