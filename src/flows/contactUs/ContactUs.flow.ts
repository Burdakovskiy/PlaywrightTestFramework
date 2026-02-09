import type { TestContext } from '../../fixtures/types';
import type { ContactUsEntity } from '../../domain/ContactUsEntity';

export class ContactUsFlow {
  static async run(ctx: TestContext, data: ContactUsEntity) {
    const home = ctx.uiRegistry.home();
    const header = ctx.uiRegistry.header();
    const contactUs = ctx.uiRegistry.contactUs();

    await ctx.step(' Open Home & verify visible', async () => {
      await header.goToHome();
      await home.assertVisible();
    });

    await ctx.step('Go to ContactUs & verify block', async () => {
      await header.goToContactUs();
      await contactUs.assertContactVisible();
    });

    await ctx.step('Fill in contact info, upload file and submit', async () => {
      await contactUs.fillInInfo(data);
      await contactUs.pressSubmit();
    });

    await ctx.step('Check success screen and go to home', async () => {
      await contactUs.assertSuccessMessageVisible();
      await contactUs.pressToHome();
      await home.assertVisible();
    });
  }
}
