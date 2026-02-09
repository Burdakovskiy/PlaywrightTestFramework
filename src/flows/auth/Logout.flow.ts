import type { TestContext } from '../../fixtures/types';

export class LogoutFlow {
  static async run(ctx: TestContext): Promise<void> {
    const header = ctx.uiRegistry.header();

    await ctx.step('Logout', async () => {
      header.assertLogoutVisible();
      header.logout();
    });
  }
}
