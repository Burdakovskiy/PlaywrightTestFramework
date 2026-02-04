import type { TestContext } from '../../fixtures/types';
import { HomePage } from '../../ui/pages/Home.page';

export class LogoutFlow {
  static async run(ctx: TestContext): Promise<void> {
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    ctx.logger.info('FLOW: Logout');
    home.assertLogoutVisible();
    home.logout();
  }
}
