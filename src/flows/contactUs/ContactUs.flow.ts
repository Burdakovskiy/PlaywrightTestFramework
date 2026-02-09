import type { TestContext } from '../../fixtures/types';
import type { ContactUsEntity } from '../../domain/ContactUsEntity';

export class ContactUsFlow {
  static async run(ctx: TestContext, data: ContactUsEntity) {
    const home = ctx.uiRegistry.home();
    const header = ctx.uiRegistry.header();
    const contactUs = ctx.uiRegistry.contactUs();

    ctx.logger.info('ContactUsFlow: Open Home & verify visible');
    await header.goToHome();
    await home.assertVisible();

    ctx.logger.info('ContactUsFlow: Go to ContactUs & verify block');
    await header.goToContactUs();
    await contactUs.assertContactVisible();

    ctx.logger.info('ContactUsFlow: Fill in contact info, upload file and submit');
    await contactUs.fillInInfo(data);
    await contactUs.pressSubmit();

    ctx.logger.info('ContactUsFlow: Check success screen and go to home');
    await contactUs.assertSuccessMessageVisible();
    await contactUs.pressToHome();
    await home.assertVisible();
  }
}
