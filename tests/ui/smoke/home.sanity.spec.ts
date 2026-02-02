import { test, expect } from '../../../src/fixtures/test.fixture';
import { UserEntityFactory } from '../../../src/data/factories/UserEntity.factory';

test('@smoke Home page is visible', async ({ ctx }) => {
  const user = UserEntityFactory.createUniqueUser();
  ctx.logger.info(`Generated user email: ${user.email}`);
  ctx.logger.info('Opening home page');
  await ctx.page.goto('/');

  ctx.logger.info('Verifying home page');
  await expect(ctx.page.locator('body')).toBeVisible();
  await expect(ctx.page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
});
