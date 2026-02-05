import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';
import { HeaderComponent } from '../components/Header.component';
import { ContactUsEntity } from '../../domain/ContactUsEntity';

export class ContactUsPage extends BasePage {
  protected readonly header: HeaderComponent;

  private readonly pageTitle: Locator;
  private readonly formRoot: Locator;

  private readonly formLocators: {
    title: Locator;
    nameInput: Locator;
    emailInput: Locator;
    subjectInput: Locator;
    messageInput: Locator;
    uploadFileInput: Locator;
    submitButton: Locator;
  };

  private readonly success: {
    successMessage: Locator;
    homeButton: Locator;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.header = new HeaderComponent(page, config, waiter, logger);
    this.pageTitle = this.page.getByRole('heading', { name: 'CONTACT US' });
    this.formRoot = this.page.locator('#contact-us-form');

    this.formLocators = {
      title: this.formRoot.getByRole('heading', { name: 'GET IN TOUCH' }),
      nameInput: this.formRoot.locator('input[data-qa="name"]'),
      emailInput: this.formRoot.locator('input[data-qa="email"]'),
      subjectInput: this.formRoot.locator('input[data-qa="subject"]'),
      messageInput: this.formRoot.locator('textarea[data-qa="message"]'),
      uploadFileInput: this.formRoot.locator('input[type="file"]'),
      submitButton: this.formRoot.locator('input[data-qa="submit-button"]'),
    };

    this.success = {
      successMessage: this.page
        .locator('#contact-page .status.alert.alert-success')
        .filter({ hasText: 'Success! Your details have been submitted successfully.' }),
      homeButton: this.page.locator('#contact-page .btn.btn-success'),
    };
  }

  async assertContactVisible(): Promise<void> {
    this.logger.info('ContactUs: assert Contact us visible');
    await this.waiter.waitVisible(this.pageTitle);
    await this.waiter.waitVisible(this.formRoot);
    await this.waiter.waitUrl(/\/contact_us/);
  }

  async fillNameInput(name: string): Promise<void> {
    await this.safeFill(this.formLocators.nameInput, name, 'Contact us: fill name');
  }

  async fillEmailInput(email: string): Promise<void> {
    await this.safeFill(this.formLocators.emailInput, email, 'Contact us: fill email');
  }

  async fillSubjectInput(subject: string): Promise<void> {
    await this.safeFill(this.formLocators.subjectInput, subject, 'Contact us: fill subject');
  }

  async fillMessageInput(message: string): Promise<void> {
    await this.safeFill(this.formLocators.messageInput, message, 'Contact us: fill message');
  }

  async fillInInfo(data: ContactUsEntity): Promise<void> {
    await this.fillNameInput(data.name);
    await this.fillEmailInput(data.email);
    await this.fillSubjectInput(data.subject);
    await this.fillMessageInput(data.message);
    await this.uploadFile(data.filePath);
  }

  async uploadFile(path: string): Promise<void> {
    await this.formLocators.uploadFileInput.setInputFiles(path);
  }

  async pressSubmit(): Promise<void> {
    await this.waiter.waitVisible(this.formLocators.submitButton);
  }

  async pressToHome(): Promise<void> {
    await this.safeClick(this.success.homeButton);
  }

  async assertSuccessMessageVisible(): Promise<void> {
    await this.waiter.waitVisible(this.success.successMessage);
  }
}
