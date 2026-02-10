import { test } from '../../../src/fixtures/ui.fixture';
import { CheckProductDetails } from '../../../src/flows/products/CheckProductDetails.flow';

test('@smoke Verify all products and product detail page', async ({ ctx }) => {
  await CheckProductDetails.run(ctx);
});
