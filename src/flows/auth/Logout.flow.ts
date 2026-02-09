import type { TestContext } from '../../fixtures/types';

export class LogoutFlow {
  static async run(ctx: TestContext): Promise<void> {
    const header = ctx.uiRegistry.header();

    ctx.logger.info('FLOW: Logout');
    header.assertLogoutVisible();
    header.logout();
  }
}
