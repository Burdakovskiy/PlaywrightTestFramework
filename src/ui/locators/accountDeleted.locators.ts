import type { Page, Locator } from '@playwright/test';

export const accountDeletedLocators = {
  accountDeletedTitle: (page: Page): Locator =>
    page.getByRole('heading', { name: /account deleted!/i }),
  continueButton: (page: Page): Locator => page.getByRole('link', { name: 'Continue' }),
};
