import { test } from '../../../src/fixtures/ui.fixture';
import { ScrollUpFlow } from '../../../src/flows/home/ScrollUp.flow';

test.describe('@ui @smoke', () => {
  test('Scroll Up using Arrow', async ({ ctx }) => {
    await ScrollUpFlow.run(ctx, 'arrow');
  });

  test('Scroll Up without Arrow', async ({ ctx }) => {
    await ScrollUpFlow.run(ctx, 'manual');
  });
});
