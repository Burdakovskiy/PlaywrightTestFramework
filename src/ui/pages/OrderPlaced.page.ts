import { type Download, type Locator, type Page, expect } from '@playwright/test';
import type { LoadedConfig } from '../../config/types';
import type { Logger } from '../../logging/Logger';
import type { Waiter } from '../../utils/Waiter';
import { BasePage } from '../base/BasePage';
import fs from 'node:fs/promises';
import path from 'node:path';

export class OrderPlacedPage extends BasePage {
  private readonly elements: {
    title: Locator;
    downloadInvoiceButton: Locator;
    continueBtn: Locator;
    downloadsDir: string;
  };

  constructor(page: Page, config: LoadedConfig, waiter: Waiter, logger: Logger) {
    super(page, config, waiter, logger);

    this.elements = {
      title: this.page.getByRole('heading', { name: /ORDER PLACED!/i }),
      downloadInvoiceButton: this.page.getByRole('link', {
        name: /Download Invoice/i,
      }),
      continueBtn: this.page.getByRole('link', { name: /Continue/i }),
      downloadsDir: path.resolve(process.cwd(), 'downloads'),
    };
  }

  async continue(): Promise<void> {
    await this.safeClick(this.elements.continueBtn, 'OrderPlaced: Continue');
  }

  async downloadInvoice(): Promise<Download> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.safeClick(this.elements.downloadInvoiceButton, 'OrderPlaced: Download Invoice'),
    ]);

    return download;
  }

  async assertVisible(): Promise<void> {
    await this.waiter.waitVisible(this.elements.title);
  }

  async assertInvoiceDownloaded(download: Download): Promise<void> {
    expect(await download.failure(), 'Download failure should be null').toBeNull();

    const fileName = download.suggestedFilename();
    expect(fileName).toMatch(/invoice/i);
    expect(fileName).toMatch(/\.txt$/i);

    await fs.mkdir(this.elements.downloadsDir, { recursive: true });

    const filePath = path.join(this.elements.downloadsDir, fileName);

    await download.saveAs(filePath);

    const stat = await fs.stat(filePath);
    expect(stat.size, `Downloaded file size should be > 0. Path: ${filePath}`).toBeGreaterThan(0);
  }
}
