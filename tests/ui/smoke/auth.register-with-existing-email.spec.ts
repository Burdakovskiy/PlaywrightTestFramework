import { test } from '../../../src/fixtures/test.fixture';
import { UserEntityFactory } from '../../../src/data/factories/UserEntity.factory';
import { RegisterUserFlow } from '../../../src/flows/auth/RegisterUser.flow';
import { DeleteAccountFlow } from '../../../src/flows/auth/DeleteAccount.flow';
import { LogoutFlow } from '../../../src/flows/auth/Logout.flow';
import { HomePage } from '../../../src/ui/pages/Home.page';
import { LoginSignupPage } from '../../../src/ui/pages/LoginSignup.page';
import { LoginUserFlow } from '../../../src/flows/auth/LoginUser.flow';

test('@negative Register user with existing email', async ({ ctx }) => {
  const user = UserEntityFactory.createUniqueUser();
  const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
  const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

  await RegisterUserFlow.run(ctx, user);
  await LogoutFlow.run(ctx);

  await home.openHome();
  await home.assertVisible();

  await home.goToLoginSignup();
  await login.assertNewUserSignupVisible();

  await login.startSignup(user.name, user.email);
  await login.assertEmailAddressAlreadyExistVisible();

  await LoginUserFlow.run(ctx, user);
  await DeleteAccountFlow.run(ctx);
});
