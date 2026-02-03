import type { TestContext } from '../../fixtures/types';
import type { UserEntity } from '../../domain/UserEntity';
import { HomePage } from '../../ui/pages/Home.page';
import { LoginSignupPage } from '../../ui/pages/LoginSignup.page';
import { SignupAccountPage } from '../../ui/pages/SignupAccount.page';
import { AccountCreatedPage } from '../../ui/pages/AccountCreated.page';

export class RegisterUserFlow {
  static async run(ctx: TestContext, user: UserEntity): Promise<void> {
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const signup = new SignupAccountPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const created = new AccountCreatedPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    ctx.logger.info('FLOW: Open Home & verify visible');
    await home.openHome();
    await home.assertVisible();

    ctx.logger.info('FLOW: Go to Signup/Login & verify block');
    await home.goToLoginSignup();
    await login.assertNewUserSignupVisible();

    ctx.logger.info('FLOW: Fill in user info and submit account creation');
    await login.startSignup(user.name, user.email);
    await signup.completeSignup(user, user.address);

    ctx.logger.info('FLOW: Verify created + continue + logged in');
    await created.assertAccountCreatedVisible();
    await created.continueToHome();
    await home.assertLoggedInAs(user.name);
  }
}
