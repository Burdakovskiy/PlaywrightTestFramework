import { test } from '../../../src/fixtures/ui.fixture';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';
import { RegisterUserFlow } from '../../../src/flows/auth/RegisterUser.flow';
import { DeleteAccountFlow } from '../../../src/flows/auth/DeleteAccount.flow';
import { LogoutFlow } from '../../../src/flows/auth/Logout.flow';
import { HomePage } from '../../../src/ui/pages/Home.page';
import { LoginSignupPage } from '../../../src/ui/pages/LoginSignup.page';
import { LoginUserFlow } from '../../../src/flows/auth/LoginUser.flow';
import { HeaderComponent } from '../../../src/ui/components/Header.component';

test.describe('@ui @smoke @negative', () => {
  test('Register user with existing email', async ({ ctx }) => {
    const user = UserDataFactory.createUniqueUser();
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    await RegisterUserFlow.run(ctx, user);
    await LogoutFlow.run(ctx);

    await header.goToHome();
    await home.assertVisible();

    await header.goToSignupLogin();
    await login.assertNewUserSignupVisible();

    await login.startSignup(user.name, user.email);
    await login.assertEmailAddressAlreadyExistVisible();

    await LoginUserFlow.run(ctx, user);
    await DeleteAccountFlow.run(ctx);
  });
});
