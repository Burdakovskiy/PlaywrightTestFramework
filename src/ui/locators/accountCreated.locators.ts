import type { Page, Locator } from '@playwright/test';

export const accountCreatedLocators = {
  accountCreatedTitle: (page: Page): Locator => page.getByText('ACCOUNT CREATED!', { exact: true }),
  continueButton: (page: Page): Locator => page.getByRole('link', { name: 'Continue' }),
};
