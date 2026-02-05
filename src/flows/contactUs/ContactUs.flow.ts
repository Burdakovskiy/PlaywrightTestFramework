import type { TestContext } from '../../fixtures/types';
import type { ContactUsEntity } from '../../domain/ContactUsEntity';
import { HomePage } from '../../ui/pages/Home.page';
import { ContactUsPage } from '../../ui/pages/ContactUs.page';

export class ContactUsFlow {
  static async run(ctx: TestContext, data: ContactUsEntity) {
    const home = new HomePage(ctx.page, ctx.config, ctx.waiter, ctx.logger);
    const contactUs = new ContactUsPage(ctx.page, ctx.config, ctx.waiter, ctx.logger);

    ctx.logger.info('ContactUsFlow: Open Home & verify visible');
    await home.openHome();
    await home.assertVisible();

    ctx.logger.info('ContactUsFlow: Go to ContactUs & verify block');
    await home.goToContuctUs();
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
