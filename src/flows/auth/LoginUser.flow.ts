import type { TestContext } from '../../fixtures/types';
import type { UserEntity } from '../../domain/UserEntity';
import { HomePage } from '../../ui/pages/Home.page';
import { LoginSignupPage } from '../../ui/pages/LoginSignup.page';
import { HeaderComponent } from '../../../src/ui/components/Header.component';

export class LoginUserFlow {
  static async run(
    ctx: TestContext,
    user: Pick<UserEntity, 'email' | 'password' | 'name'>,
  ): Promise<void> {
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const login = new LoginSignupPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

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
