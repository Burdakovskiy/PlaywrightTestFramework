import type { TestContext } from '../../fixtures/types';

export class ScrollUpFlow {
  static async run(ctx: TestContext, mode: 'arrow' | 'manual'): Promise<void> {
    const header = ctx.uiRegistry.header();
    const home = ctx.uiRegistry.home();

    ctx.logger.info('ScrollUpFlow: Open Home & verify visible');
    await header.goToHome();
    await home.assertVisible();

    ctx.logger.info('ScrollUpFlow: Scroll down & verify SUBSCRIPTION');
    await home.scrollToSubscriptionAndAssertVisible();

    if (mode === 'arrow') {
      ctx.logger.info('ScrollUpFlow: Scroll up using arrow');
      home.clickScrollUpArrowAndAssertTop();
    } else {
      ctx.logger.info('ScrollUpFlow: Scroll up without arrow');
      await home.scrollToTopAndAssertTop();
    }
  }
}
