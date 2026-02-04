import { test } from '../../../src/fixtures/test.fixture';
import { UserEntityFactory } from '../../../src/data/factories/UserEntity.factory';
import { RegisterUserFlow } from '../../../src/flows/auth/RegisterUser.flow';
import { LogoutFlow } from '../../../src/flows/auth/Logout.flow';
import { HomePage } from '../../../src/ui/pages/Home.page';
import { LoginSignupPage } from '../../../src/ui/pages/LoginSignup.page';
import { DeleteAccountFlow } from '../../../src/flows/auth/DeleteAccount.flow';

test.describe('@negative login with incorrect email and password', async () => {
  test('@negative login with incorrect email', async ({ ctx }) => {
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    await home.openHome();
    await home.goToLoginSignup();
    await login.assertLoginToYourAccountVisible();

    await login.startLogin('wrongUserEmail@gmail.com', 'WorngPassword123!');

    await login.assertLoginErrorVisible();
    await home.assertNotLoggedIn();
  });

  test('@negative login with incorrect password', async ({ ctx }) => {
    const user = UserEntityFactory.createUniqueUser();

    await RegisterUserFlow.run(ctx, user);
    await LogoutFlow.run(ctx);

    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    await home.openHome();
    await home.goToLoginSignup();
    await login.assertLoginToYourAccountVisible();

    await login.startLogin(user.email, 'WorngPassword123!');

    await login.assertLoginErrorVisible();
    await home.assertNotLoggedIn();

    //Cleanup
    await login.startLogin(user.email, user.password);
    await home.assertLoggedInAs(user.name);
    await DeleteAccountFlow.run(ctx);
  });
});
