import type { TestContext } from '../../fixtures/types';

export class ScrollUpFlow {
  static async run(ctx: TestContext, mode: 'arrow' | 'manual'): Promise<void> {
    const header = ctx.uiRegistry.header();
    const home = ctx.uiRegistry.home();

    await ctx.step('Open Home & verify visible', async () => {
      await header.goToHome();
      await home.assertVisible();
    });

    await ctx.step('Scroll down & verify SUBSCRIPTION', async () => {
      await home.scrollToSubscriptionAndAssertVisible();
    });

    await ctx.step('Logout', async () => {});

    if (mode === 'arrow') {
      await ctx.step('Scroll up using arrow', async () => {
        home.clickScrollUpArrowAndAssertTop();
      });
    } else {
      await ctx.step('Scroll up without arrow', async () => {
        await home.scrollToTopAndAssertTop();
      });
    }
  }
}
