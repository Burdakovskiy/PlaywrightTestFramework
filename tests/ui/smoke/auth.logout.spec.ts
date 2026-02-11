import { test } from '../../../src/fixtures/ui.fixture';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';
import { RegisterUserFlow } from '../../../src/flows/auth/RegisterUser.flow';
import { DeleteAccountFlow } from '../../../src/flows/auth/DeleteAccount.flow';
import { LogoutFlow } from '../../../src/flows/auth/Logout.flow';
import { LoginUserFlow } from '../../../src/flows/auth/LoginUser.flow';
import { LoginSignupPage } from '../../../src/ui/pages/LoginSignup.page';

test.describe('@ui @smoke', () => {
  test('Logout user', async ({ ctx }) => {
    const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    const user = UserDataFactory.createUniqueUser();

    await RegisterUserFlow.run(ctx, user);
    await LogoutFlow.run(ctx);

    await login.assertLoginPageVisible();

    await LoginUserFlow.run(ctx, user);
    await DeleteAccountFlow.run(ctx);
  });
});
