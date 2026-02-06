import type { TestContext } from '../../fixtures/types';
import { AccountDeletedPage } from '../../ui/pages/AccountDeleted.page';
import { HeaderComponent } from '../../../src/ui/components/Header.component';

export class DeleteAccountFlow {
  static async run(ctx: TestContext): Promise<void> {
    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const deleted = new AccountDeletedPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    ctx.logger.info('FLOW: Click Delete Account');
    await header.goToAccountDeletion();

    ctx.logger.info('FLOW: Verify Account Deleted + Continue');
    await deleted.assertAccountDeletedVisible();
    await deleted.continue();
  }
}
