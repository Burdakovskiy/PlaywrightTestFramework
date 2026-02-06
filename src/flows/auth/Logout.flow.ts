import type { TestContext } from '../../fixtures/types';
import { HeaderComponent } from '../../../src/ui/components/Header.component';

export class LogoutFlow {
  static async run(ctx: TestContext): Promise<void> {
    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    ctx.logger.info('FLOW: Logout');
    header.assertLogoutVisible();
    header.logout();
  }
}
