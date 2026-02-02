import type { Page, Locator } from '@playwright/test';

export const homeLocators = {
  body: (page: Page): Locator => page.locator('body'),
  signupLoginLink: (page: Page): Locator => page.getByRole('link', { name: 'Signup / Login' }),
};
