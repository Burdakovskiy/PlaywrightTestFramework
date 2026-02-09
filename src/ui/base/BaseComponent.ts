import type { Locator, Page } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';

export abstract class BaseComponent {
  constructor(
    protected readonly page: Page,
    protected readonly config: LoadedConfig,
    protected readonly waiter: Waiter,
    protected readonly logger: Logger,
  ) {}

  protected async open(path: string): Promise<void> {
    this.logger.debug(`Open: ${path}`);
    await this.page.goto(path);
    await this.waiter.waitPageReady();
    await this.dismissConsentIfPresent();
  }

  protected async safeClick(locator: Locator, description: string = 'click'): Promise<void> {
    this.logger.debug(`Component action: ${description}`);
    await this.waiter.waitVisible(locator);
    await locator.click();
  }

  protected async assertTextContains(
    locator: Locator,
    value: string,
    step?: string,
  ): Promise<void> {
    if (step) {
      this.logger.info(step);
    }
    await this.waiter.waitVisible(locator);
    await this.waiter.waitText(locator, value);
  }

  private async dismissConsentIfPresent(): Promise<void> {
    const overlay = this.page.locator('.fc-consent-root, .fc-dialog-overlay').first();

    if (await overlay.isVisible({ timeout: 500 })) {
      this.logger.debug('Consent overlay detected: dismissing');

      const accept = this.page.getByRole('button', {
        name: /accept|agree|allow all|akzeptieren|alles akzeptieren/i,
      });
      const reject = this.page.getByRole('button', {
        name: /reject|decline|deny|only necessary|ablehnen|nur notwendige/i,
      });
      const close = this.page.getByRole('button', { name: /close|Consent|schließen|×/i });

      if (await accept.isVisible({ timeout: 500 }).catch(() => false)) {
        await accept.click();
      } else if (await reject.isVisible({ timeout: 500 }).catch(() => false)) {
        await reject.click();
      } else if (await close.isVisible({ timeout: 500 }).catch(() => false)) {
        await close.click();
      } else {
        this.logger.warn('Consent overlay has no known buttons');
      }

      await overlay.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    }
  }
}
