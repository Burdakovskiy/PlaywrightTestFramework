import { test, expect } from '../../../src/fixtures/test.fixture';
import { UserEntityFactory } from '../../../src/data/factories/UserEntity.factory';
import { homeLocators } from '../../../src/ui/locators/home.locators';

test('@smoke Home page is visible', async ({ ctx }) => {
  const user = UserEntityFactory.createUniqueUser();
  ctx.logger.info(`Generated user email: ${user.email}`);
  ctx.logger.info('Opening home page');
  await ctx.page.goto('/');

  ctx.logger.info('Verifying home page');
  await ctx.waiter.waitVisible(homeLocators.body(ctx.page));
  await ctx.waiter.waitVisible(homeLocators.signupLoginLink(ctx.page));
});
