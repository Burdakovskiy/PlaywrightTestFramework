import { test } from '../../../src/fixtures/ui.fixture';
import { AddProductToCartFlow } from '../../../src/flows/products/AddProductToCart.flow';

test('@smoke Add products to cart and check existing', async ({ ctx }) => {
  const productsId = [1, 2];
  await AddProductToCartFlow.run(ctx, productsId);
});
