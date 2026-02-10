import { test } from '../../../src/fixtures/ui.fixture';
import { ScrollUpFlow } from '../../../src/flows/home/ScrollUp.flow';

test.describe('@smoke Scroll down and up', () => {
  test('@smoke Scroll Up using Arrow', async ({ ctx }) => {
    await ScrollUpFlow.run(ctx, 'arrow');
  });

  test('@smoke Scroll Up without Arrow', async ({ ctx }) => {
    await ScrollUpFlow.run(ctx, 'manual');
  });
});
