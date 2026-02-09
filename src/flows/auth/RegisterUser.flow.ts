import type { TestContext } from '../../fixtures/types';
import type { UserEntity } from '../../domain/UserEntity';

export class RegisterUserFlow {
  static async run(ctx: TestContext, user: UserEntity): Promise<void> {
    const home = ctx.uiRegistry.home();
    const header = ctx.uiRegistry.header();
    const login = ctx.uiRegistry.loginSignup();
    const signup = ctx.uiRegistry.signupAccount();
    const created = ctx.uiRegistry.accountCreated();

    await ctx.step('Open Home & verify visible', async () => {
      await header.goToHome();
      await home.assertVisible();
    });

    await ctx.step('Go to Signup/Login & verify block', async () => {
      await header.goToSignupLogin();
      await login.assertNewUserSignupVisible();
    });

    await ctx.step('Fill in user info and submit account creation', async () => {
      await login.startSignup(user.name, user.email);
      await signup.completeSignup(user, user.address);
    });

    await ctx.step('Verify created + continue + logged in', async () => {
      await created.assertAccountCreatedVisible();
      await created.continueToHome();
      await header.assertLoggedInAs(user.name);
    });
  }
}
