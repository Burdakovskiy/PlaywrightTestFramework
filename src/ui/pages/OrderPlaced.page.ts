import { type Download, type Locator, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import fs from 'node:fs/promises';
import path from 'node:path';

export class OrderPlacedPage extends BasePage {
  private readonly title: Locator = this.page.getByRole('heading', { name: /ORDER PLACED!/i });
  private readonly downloadInvoiceButton = this.page.getByRole('link', {
    name: /Download Invoice/i,
  });
  private readonly continueBtn: Locator = this.page.getByRole('link', { name: /Continue/i });
  private readonly downloadsDir: string = path.resolve(process.cwd(), 'downloads');

  async assertVisible(): Promise<void> {
    await this.waiter.waitVisible(this.title);
  }

  async continue(): Promise<void> {
    await this.safeClick(this.continueBtn, 'OrderPlaced: Continue');
  }

  async downloadInvoice(): Promise<Download> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.safeClick(this.downloadInvoiceButton, 'OrderPlaced: Download Invoice'),
    ]);

    return download;
  }

  async assertInvoiceDownloaded(download: Download): Promise<void> {
    expect(await download.failure(), 'Download failure should be null').toBeNull();

    const fileName = download.suggestedFilename();
    expect(fileName).toMatch(/invoice/i);
    expect(fileName).toMatch(/\.txt$/i);

    await fs.mkdir(this.downloadsDir, { recursive: true });

    const filePath = path.join(this.downloadsDir, fileName);

    await download.saveAs(filePath);

    const stat = await fs.stat(filePath);
    expect(stat.size, `Downloaded file size should be > 0. Path: ${filePath}`).toBeGreaterThan(0);
  }
}
