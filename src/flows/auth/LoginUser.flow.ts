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

    await ctx.step('Open Home & verify visible', async () => {
      await header.goToHome();
      await home.assertVisible();
    });

    await ctx.step('Go to Signup/Login & verify login block', async () => {
      await header.goToSignupLogin();
      await login.assertLoginToYourAccountVisible();
    });

    await ctx.step('FLOW: Login with valid credentials', async () => {
      await login.startLogin(user.email, user.password);
    });

    await ctx.step('FLOW: Verify logged in', async () => {
      await header.assertLoggedInAs(user.name);
    });
  }
}
