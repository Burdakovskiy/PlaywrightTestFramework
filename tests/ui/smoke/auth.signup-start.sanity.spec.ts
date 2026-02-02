import { test } from '../../../src/fixtures/test.fixture';
import { UserEntityFactory } from '../../../src/data/factories/UserEntity.factory';
import { HomePage } from '../../../src/ui/pages/Home.page';
import { LoginSignupPage } from '../../../src/ui/pages/LoginSignup.page';

test('@smoke Start signup flow (name+email)', async ({ ctx }) => {
  const user = UserEntityFactory.createUniqueUser();

  const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
  const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

  await home.openHome();
  await home.assertVisible();

  await home.header().clickSignupLogin();

  await login.assertNewUserSignupVisible();

  await login.startSignup(user.name, user.email);
});
