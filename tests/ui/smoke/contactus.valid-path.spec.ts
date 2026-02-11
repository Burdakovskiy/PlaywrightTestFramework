import { test } from '../../../src/fixtures/ui.fixture';
import { ContactUsDataFactory } from '../../../src/data/factories/ContactUs.factory';
import { ContactUsFlow } from '../../../src/flows/contactUs/ContactUs.flow';

test.describe('@ui @smoke', () => {
  test.fail('"Contact us" valid flow', async ({ ctx }) => {
    const data = ContactUsDataFactory.default();

    await ContactUsFlow.run(ctx, data);
  });
});
