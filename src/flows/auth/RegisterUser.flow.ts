import type { TestContext } from '../../fixtures/types';
import type { UserEntity } from '../../domain/UserEntity';

export class RegisterUserFlow {
  static async run(ctx: TestContext, user: UserEntity): Promise<void> {
    const home = ctx.uiRegistry.home();
    const header = ctx.uiRegistry.header();
    const login = ctx.uiRegistry.loginSignup();
    const signup = ctx.uiRegistry.signupAccount();
    const created = ctx.uiRegistry.accountCreated();

    ctx.logger.info('FLOW: Open Home & verify visible');
    await header.goToHome();
    await home.assertVisible();

    ctx.logger.info('FLOW: Go to Signup/Login & verify block');
    await header.goToSignupLogin();
    await login.assertNewUserSignupVisible();

    ctx.logger.info('FLOW: Fill in user info and submit account creation');
    await login.startSignup(user.name, user.email);
    await signup.completeSignup(user, user.address);

    ctx.logger.info('FLOW: Verify created + continue + logged in');
    await created.assertAccountCreatedVisible();
    await created.continueToHome();
    await header.assertLoggedInAs(user.name);
  }
}
