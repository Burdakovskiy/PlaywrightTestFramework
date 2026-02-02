import type { Page, Locator } from '@playwright/test';

export const accountDeletedLocators = {
  accountDeletedTitle: (page: Page): Locator => page.getByText('ACCOUNT DELETED!', { exact: true }),
  continueButton: (page: Page): Locator => page.getByRole('link', { name: 'Continue' }),
};
