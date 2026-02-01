import { test, expect } from '@playwright/test';

test('@smoke Home page is visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
});
