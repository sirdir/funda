import { expect, type Locator, type Page } from '@playwright/test';
import { SearchPage } from './SearchPage';

export class StartPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly suggestionList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByTestId('search-box');
    this.suggestionList = page.getByTestId('SearchBox-location-suggestion');
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(query: string, index = 0): Promise<SearchPage> {
    await this.searchBox.fill(query);
    await this.suggestionList.nth(index).click();
    expect(this.page).toHaveURL(/https\:\/\/www\.funda\.nl\/zoeken/);

    return new SearchPage(this.page);
  }
}
