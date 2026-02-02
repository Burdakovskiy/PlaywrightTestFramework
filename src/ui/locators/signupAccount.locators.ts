import type { Page, Locator } from '@playwright/test';

export const signupAccountLocators = {
  enterAccountInfoTitle: (page: Page): Locator =>
    page.getByText('ENTER ACCOUNT INFORMATION', { exact: false }),

  titleMrRadio: (page: Page): Locator => page.locator('#id_gender1'),
  titleMrsRadio: (page: Page): Locator => page.locator('#id_gender2'),

  nameInput: (page: Page): Locator => page.locator('#name'),
  emailInput: (page: Page): Locator => page.locator('#email'),
  passwordInput: (page: Page): Locator => page.locator('#password'),

  daySelect: (page: Page): Locator => page.locator('#days'),
  monthSelect: (page: Page): Locator => page.locator('#months'),
  yearSelect: (page: Page): Locator => page.locator('#years'),

  newsletterCheckbox: (page: Page): Locator => page.locator('#newsletter'),
  offersCheckbox: (page: Page): Locator => page.locator('#optin'),

  firstNameInput: (page: Page): Locator => page.locator('#first_name'),
  lastNameInput: (page: Page): Locator => page.locator('#last_name'),
  companyInput: (page: Page): Locator => page.locator('#company'),
  address1Input: (page: Page): Locator => page.locator('#address1'),
  address2Input: (page: Page): Locator => page.locator('#address2'),
  countrySelect: (page: Page): Locator => page.locator('#country'),
  stateInput: (page: Page): Locator => page.locator('#state'),
  cityInput: (page: Page): Locator => page.locator('#city'),
  zipcodeInput: (page: Page): Locator => page.locator('#zipcode'),
  mobileNumberInput: (page: Page): Locator => page.locator('#mobile_number'),

  createAccountButton: (page: Page): Locator =>
    page.getByRole('button', { name: 'Create Account' }),
};
