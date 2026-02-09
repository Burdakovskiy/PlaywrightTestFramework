import type { TestContext } from '../../fixtures/types';
import type { UserEntity } from '../../domain/UserEntity';

export class LoginUserFlow {
  static async run(
    ctx: TestContext,
    user: Pick<UserEntity, 'email' | 'password' | 'name'>,
  ): Promise<void> {
    const home = ctx.uiRegistry.home();
    const header = ctx.uiRegistry.header();
    const login = ctx.uiRegistry.loginSignup();

    ctx.logger.info('FLOW: Open Home & verify visible');
    await header.goToHome();
    await home.assertVisible();

    ctx.logger.info('FLOW: Go to Signup/Login & verify login block');
    await header.goToSignupLogin();
    await login.assertLoginToYourAccountVisible();

    ctx.logger.info('FLOW: Login with valid credentials');
    await login.startLogin(user.email, user.password);

    ctx.logger.info('FLOW: Verify logged in');
    await header.assertLoggedInAs(user.name);
  }
}
