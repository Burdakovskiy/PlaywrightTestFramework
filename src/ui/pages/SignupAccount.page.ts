import type { UserEntity } from '../../domain/UserEntity';
import type { AddressEntity } from '../../domain/AddressEntity';
import { BasePage } from '../base/BasePage';
import { signupAccountLocators } from '../locators/signupAccount.locators';

export class SignupAccountPage extends BasePage {
  async assertEnterAccountInfoVisible(): Promise<void> {
    this.logger.info('SignupAccount: assert ENTER ACCOUNT INFORMATION visible');
    await this.waiter.waitVisible(signupAccountLocators.enterAccountInfoTitle(this.page));
  }

  async fillAccountInformation(user: UserEntity): Promise<void> {
    this.logger.info('SignupAccount: fill account information');

    if (user.title === 'Mrs') {
      await this.safeClick(signupAccountLocators.titleMrRadio(this.page), 'Select title Mr');
    } else {
      await this.safeClick(signupAccountLocators.titleMrsRadio(this.page), 'Select title Mrs');
    }

    await this.waiter.waitVisible(signupAccountLocators.nameInput(this.page));
    await this.waiter.waitVisible(signupAccountLocators.emailInput(this.page));

    await this.safeFill(
      signupAccountLocators.passwordInput(this.page),
      user.password,
      'Fill password',
    );

    await signupAccountLocators.daySelect(this.page).selectOption({ label: user.dateOfBirth.day });
    await signupAccountLocators
      .monthSelect(this.page)
      .selectOption({ label: user.dateOfBirth.month });
    await signupAccountLocators
      .yearSelect(this.page)
      .selectOption({ label: user.dateOfBirth.year });

    const newsletter = signupAccountLocators.newsletterCheckbox(this.page);
    const offers = signupAccountLocators.offersCheckbox(this.page);

    if (user.newsletter) {
      await newsletter.check();
    } else {
      await newsletter.uncheck();
    }

    if (user.specialOffers) {
      await offers.check();
    } else {
      await offers.uncheck();
    }
  }

  async fillAddressInformation(address: AddressEntity): Promise<void> {
    this.logger.info('SignupAccount: fill address information');

    await this.safeFill(
      signupAccountLocators.firstNameInput(this.page),
      address.firstName,
      'Fill first name',
    );
    await this.safeFill(
      signupAccountLocators.lastNameInput(this.page),
      address.lastName,
      'Fill last name',
    );

    if (address.company) {
      await this.safeFill(
        signupAccountLocators.companyInput(this.page),
        address.company,
        'Fill company',
      );
    }

    await this.safeFill(
      signupAccountLocators.address1Input(this.page),
      address.address1,
      'Fill address1',
    );

    if (address.address2) {
      await this.safeFill(
        signupAccountLocators.address2Input(this.page),
        address.address2,
        'Fill address2',
      );
    }

    await signupAccountLocators.countrySelect(this.page).selectOption({ label: address.country });

    await this.safeFill(signupAccountLocators.stateInput(this.page), address.state, 'Fill state');
    await this.safeFill(signupAccountLocators.cityInput(this.page), address.city, 'Fill city');
    await this.safeFill(
      signupAccountLocators.zipcodeInput(this.page),
      address.zipcode,
      'Fill zipcode',
    );
    await this.safeFill(
      signupAccountLocators.mobileNumberInput(this.page),
      address.mobileNumber,
      'Fill mobile number',
    );
  }

  async submitCreateAccount(): Promise<void> {
    this.logger.info('SignupAccount: submit Create Account');
    await this.safeClick(
      signupAccountLocators.createAccountButton(this.page),
      'Click Create Account',
    );
  }
}
