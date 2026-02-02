import type { Locator, Page, Expect } from '@playwright/test';
import type { EffectiveTimeouts } from './Timeouts';

type LoadState = Parameters<Page['waitForLoadState']>[0];

export class Waiter {
  constructor(
    private readonly page: Page,
    private readonly expect: Expect,
    private readonly timeouts: EffectiveTimeouts,
  ) {}

  async waitVisible(locator: Locator, timeoutMs: number = this.timeouts.ui): Promise<void> {
    await this.expect(locator).toBeVisible({ timeout: timeoutMs });
  }

  async waitHidden(locator: Locator, timeoutMs: number = this.timeouts.ui): Promise<void> {
    await this.expect(locator).toBeHidden({ timeout: timeoutMs });
  }

  async waitText(locator: Locator, text: string | RegExp, timeoutMs: number = this.timeouts.ui) {
    await this.expect(locator).toContainText(text, { timeout: timeoutMs });
  }

  async waitUrl(url: string | RegExp, timeoutMs: number = this.timeouts.navigation): Promise<void> {
    await this.expect(this.page).toHaveURL(url, { timeout: timeoutMs });
  }

  async waitPageReady(state: LoadState = 'domcontentloaded') {
    await this.page.waitForLoadState(state, { timeout: this.timeouts.navigation });
  }
}
