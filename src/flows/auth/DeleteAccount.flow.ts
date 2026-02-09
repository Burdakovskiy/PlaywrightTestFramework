import type { TestContext } from '../../fixtures/types';

export class DeleteAccountFlow {
  static async run(ctx: TestContext): Promise<void> {
    const header = ctx.uiRegistry.header();
    const deleted = ctx.uiRegistry.accountDeleted();

    await ctx.step('Delete Account', async () => {
      await header.goToAccountDeletion();
    });

    await ctx.step('Verify Account Deleted + Continue', async () => {
      await deleted.assertAccountDeletedVisible();
      await deleted.continue();
    });
  }
}
