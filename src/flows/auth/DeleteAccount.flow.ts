import type { TestContext } from '../../fixtures/types';

export class DeleteAccountFlow {
  static async run(ctx: TestContext): Promise<void> {
    const header = ctx.uiRegistry.header();
    const deleted = ctx.uiRegistry.accountDeleted();

    ctx.logger.info('FLOW: Click Delete Account');
    await header.goToAccountDeletion();

    ctx.logger.info('FLOW: Verify Account Deleted + Continue');
    await deleted.assertAccountDeletedVisible();
    await deleted.continue();
  }
}
