import { expect, type Locator, type Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly header: Locator;
  readonly searchedItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('h1', { hasText: 'koopwoningen in Amsterdam' });
    this.searchedItems = page.locator('[data-test-id="search-result-item"]');
  }
}
