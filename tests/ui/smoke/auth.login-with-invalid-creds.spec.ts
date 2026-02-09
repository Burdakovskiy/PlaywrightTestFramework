import { test } from '../../../src/fixtures/test.fixture';
import { UserDataFactory } from '../../../src/data/factories/UserData.factory';
import { RegisterUserFlow } from '../../../src/flows/auth/RegisterUser.flow';
import { LogoutFlow } from '../../../src/flows/auth/Logout.flow';
import { LoginSignupPage } from '../../../src/ui/pages/LoginSignup.page';
import { DeleteAccountFlow } from '../../../src/flows/auth/DeleteAccount.flow';
import { HeaderComponent } from '../../../src/ui/components/Header.component';

test.describe('@negative Login with incorrect email and password', () => {
  test('@negative Login with incorrect email', async ({ ctx }) => {
    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    await header.goToHome();
    await header.goToSignupLogin();
    await login.assertLoginToYourAccountVisible();

    await login.startLogin('wrongUserEmail@gmail.com', 'WorngPassword123!');

    await login.assertLoginErrorVisible();
    await header.assertNotLoggedIn();
  });

  test('@negative Login with incorrect password', async ({ ctx }) => {
    const user = UserDataFactory.createUniqueUser();

    await RegisterUserFlow.run(ctx, user);
    await LogoutFlow.run(ctx);

    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    await header.goToHome();
    await header.goToSignupLogin();
    await login.assertLoginToYourAccountVisible();

    await login.startLogin(user.email, 'WorngPassword123!');

    await login.assertLoginErrorVisible();
    await header.assertNotLoggedIn();

    //Cleanup
    await login.startLogin(user.email, user.password);
    await header.assertLoggedInAs(user.name);
    await DeleteAccountFlow.run(ctx);
  });
});
