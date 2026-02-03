import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import type { UserEntity } from '../../domain/UserEntity';
import type { AddressEntity } from '../../domain/AddressEntity';
import { BasePage } from '../base/BasePage';

export class SignupAccountPage extends BasePage {
  private readonly view: {
    enterAccountInfoTitle: Locator;
  };

  private readonly titles: {
    mr: Locator;
    mrs: Locator;
  };

  private readonly account: {
    name: Locator;
    email: Locator;
    password: Locator;
    day: Locator;
    month: Locator;
    year: Locator;
  };

  private readonly preferences: {
    newsletter: Locator;
    offers: Locator;
  };

  private readonly address: {
    firstName: Locator;
    lastName: Locator;
    company: Locator;
    address1: Locator;
    address2: Locator;
    country: Locator;
    state: Locator;
    city: Locator;
    zipcode: Locator;
    mobileNumber: Locator;
  };

  private readonly actions: {
    createAccount: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.view = {
      enterAccountInfoTitle: this.page.getByText('ENTER ACCOUNT INFORMATION', { exact: false }),
    };

    this.titles = {
      mr: this.page.locator('#id_gender1'),
      mrs: this.page.locator('#id_gender2'),
    };

    this.account = {
      name: this.page.locator('#name'),
      email: this.page.locator('#email'),
      password: this.page.locator('#password'),
      day: this.page.locator('#days'),
      month: this.page.locator('#months'),
      year: this.page.locator('#years'),
    };

    this.preferences = {
      newsletter: this.page.locator('#newsletter'),
      offers: this.page.locator('#optin'),
    };

    this.address = {
      firstName: this.page.locator('#first_name'),
      lastName: this.page.locator('#last_name'),
      company: this.page.locator('#company'),
      address1: this.page.locator('#address1'),
      address2: this.page.locator('#address2'),
      country: this.page.locator('#country'),
      state: this.page.locator('#state'),
      city: this.page.locator('#city'),
      zipcode: this.page.locator('#zipcode'),
      mobileNumber: this.page.locator('#mobile_number'),
    };

    this.actions = {
      createAccount: this.page.getByRole('button', { name: 'Create Account' }),
    };
  }

  async assertEnterAccountInfoVisible(): Promise<void> {
    this.logger.info('SignupAccount: assert ENTER ACCOUNT INFORMATION visible');
    await this.waiter.waitVisible(this.view.enterAccountInfoTitle);
  }

  async fillAccountInformation(user: UserEntity): Promise<void> {
    this.logger.info('SignupAccount: fill account information');

    if (user.title === 'Mrs') {
      await this.safeClick(this.titles.mr, 'Select title Mr');
    } else {
      await this.safeClick(this.titles.mrs, 'Select title Mrs');
    }

    await this.waiter.waitVisible(this.account.name);
    await this.waiter.waitVisible(this.account.email);

    await this.safeFill(this.account.password, user.password, 'Fill password');

    await this.account.day.selectOption({ label: user.dateOfBirth.day });
    await this.account.month.selectOption({ label: user.dateOfBirth.month });
    await this.account.year.selectOption({ label: user.dateOfBirth.year });

    if (user.newsletter) {
      await this.preferences.newsletter.check();
    } else {
      await this.preferences.newsletter.uncheck();
    }

    if (user.specialOffers) {
      await this.preferences.offers.check();
    } else {
      await this.preferences.offers.uncheck();
    }
  }

  async fillAddressInformation(address: AddressEntity): Promise<void> {
    this.logger.info('SignupAccount: fill address information');

    await this.safeFill(this.address.firstName, address.firstName, 'Fill first name');
    await this.safeFill(this.address.lastName, address.lastName, 'Fill last name');

    if (address.company) {
      await this.safeFill(this.address.company, address.company, 'Fill company');
    }

    await this.safeFill(this.address.address1, address.address1, 'Fill address1');

    if (address.address2) {
      await this.safeFill(this.address.address2, address.address2, 'Fill address2');
    }

    await this.address.country.selectOption({ label: address.country });

    await this.safeFill(this.address.state, address.state, 'Fill state');
    await this.safeFill(this.address.city, address.city, 'Fill city');
    await this.safeFill(this.address.zipcode, address.zipcode, 'Fill zipcode');
    await this.safeFill(this.address.mobileNumber, address.mobileNumber, 'Fill mobile number');
  }

  async submitCreateAccount(): Promise<void> {
    this.logger.info('SignupAccount: submit Create Account');
    await this.safeClick(this.actions.createAccount, 'Click Create Account');
  }
}
