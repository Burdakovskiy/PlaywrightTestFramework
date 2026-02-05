import { test } from '../../../src/fixtures/test.fixture';
import { CheckProductDetails } from '../../../src/flows/products/CheckProductDetails.flow';

test('@smoke Verify All Products and product detail page', async ({ ctx }) => {
  await CheckProductDetails.run(ctx);
});
