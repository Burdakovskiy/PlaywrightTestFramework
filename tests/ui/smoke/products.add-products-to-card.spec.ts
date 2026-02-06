import { test } from '../../../src/fixtures/test.fixture';
import { AddProductToCartFlow } from '../../../src/flows/products/AddProductToCart.flow';

test('@smoke Add products to cart and check existing', async ({ ctx }) => {
  await AddProductToCartFlow.run(ctx);
});
