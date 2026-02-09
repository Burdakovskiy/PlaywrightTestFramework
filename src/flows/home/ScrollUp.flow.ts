import type { TestContext } from '../../fixtures/types';
import { HeaderComponent } from '../../ui/components/Header.component';
import { HomePage } from '../../ui/pages/Home.page';

export class ScrollUpFlow {
  static async run(ctx: TestContext, mode: 'arrow' | 'manual'): Promise<void> {
    const header = new HeaderComponent(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

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
