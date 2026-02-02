import type { Page, Locator } from '@playwright/test';

export const headerLocators = {
  signupLoginLink: (page: Page): Locator => page.getByRole('link', { name: 'Signup / Login' }),

  loggedInAsText: (page: Page): Locator => page.getByText('Logged in as', { exact: false }),
  deleteAccountLink: (page: Page): Locator => page.getByRole('link', { name: 'Delete Account' }),
};
