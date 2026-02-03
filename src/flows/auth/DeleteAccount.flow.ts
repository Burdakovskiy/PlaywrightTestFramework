import type { TestContext } from '../../fixtures/types';
import { HomePage } from '../../ui/pages/Home.page';
import { AccountDeletedPage } from '../../ui/pages/AccountDeleted.page';

export class DeleteAccountFlow {
  static async run(ctx: TestContext): Promise<void> {
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const deleted = new AccountDeletedPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    ctx.logger.info('FLOW: Click Delete Account');
    await home.header().clickDeleteAccount();

    ctx.logger.info('FLOW: Verify Account Deleted + Continue');
    await deleted.assertAccountDeletedVisible();
    await deleted.continue();
  }
}
