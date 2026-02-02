import type { Page, Locator } from '@playwright/test';

export const loginSignupLocators = {
  newUserSignupTitle: (page: Page): Locator => page.getByText('New User Signup!', { exact: true }),
  signupNameInput: (page: Page): Locator => page.getByPlaceholder('Name'),
  signupEmailInput: (page: Page): Locator =>
    page.locator('form[action="/signup"] input[data-qa="signup-email"]'),
  signupButton: (page: Page): Locator => page.getByRole('button', { name: 'Signup' }),
};
