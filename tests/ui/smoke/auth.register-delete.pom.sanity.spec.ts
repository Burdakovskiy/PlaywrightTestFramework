import { test } from '../../../src/fixtures/test.fixture';
import { UserEntityFactory } from '../../../src/data/factories/UserEntity.factory';
import { HomePage } from '../../../src/ui/pages/Home.page';
import { LoginSignupPage } from '../../../src/ui/pages/LoginSignup.page';
import { SignupAccountPage } from '../../../src/ui/pages/SignupAccount.page';
import { AccountCreatedPage } from '../../../src/ui/pages/AccountCreated.page';
import { AccountDeletedPage } from '../../../src/ui/pages/AccountDeleted.page';

test('@smoke Register and delete user)', async ({ ctx }) => {
  const user = UserEntityFactory.createUniqueUser();

  const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
  const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
  const signup = new SignupAccountPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
  const created = new AccountCreatedPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
  const deleted = new AccountDeletedPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

  await home.openHome();
  await home.assertVisible();

  await home.header().clickSignupLogin();
  await login.assertNewUserSignupVisible();
  await login.startSignup(user.name, user.email);

  await signup.assertEnterAccountInfoVisible();
  await signup.fillAccountInformation(user);
  await signup.fillAddressInformation(user.address);
  await signup.submitCreateAccount();

  await created.assertAccountCreatedVisible();
  await created.continue();

  await home.header().assertLoggedInAs(user.name);

  await home.header().clickDeleteAccount();
  await deleted.assertAccountDeletedVisible();
  await deleted.continue();
});
