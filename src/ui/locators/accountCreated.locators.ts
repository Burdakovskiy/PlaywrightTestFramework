import type { Page, Locator } from '@playwright/test';

export const accountCreatedLocators = {
  accountCreatedTitle: (page: Page): Locator =>
    page.getByRole('heading', { name: /account created!/i }),
  continueButton: (page: Page): Locator => page.getByRole('link', { name: 'Continue' }),
};
