import { test } from '../../../src/fixtures/test.fixture';
import { ContactUsDataFactory } from '../../../src/data/factories/ContactUs.factory';
import { ContactUsFlow } from '../../../src/flows/contactUs/ContactUs.flow';

test.fail('@smoke "Contact us" valid flow', async ({ ctx }) => {
  const data = ContactUsDataFactory.default();

  await ContactUsFlow.run(ctx, data);
});
