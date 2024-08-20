import { expect, type Locator, type Page } from '@playwright/test';

export class SearchPage {
  async openMap() {
    await this.mapButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
  readonly page: Page;
  readonly header: Locator;
  readonly searchResultAmmount: Locator;
  readonly searchedItems: Locator;
  readonly priceFromDropdown: Locator;
  readonly priceToDropdown: Locator;
  readonly mapButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('h1', { hasText: 'koopwoningen in Amsterdam' });
    this.searchResultAmmount = this.header.getByText('koopwoningen');
    this.searchedItems = page.getByTestId('search-result-item');
    this.priceFromDropdown = page.getByTestId('price-filter').getByTestId('minmax-filter-min').getByTestId('ui-select');
    this.priceToDropdown = page.getByTestId('price-filter').getByTestId('minmax-filter-max').getByTestId('ui-select');
    this.mapButton = page.getByRole('button', { name: 'Kaart' });
  }

  async goto(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async filterByPriceRange(from: string, to: string) {
    await this.priceFromDropdown.selectOption({ value: from }, { noWaitAfter: false });
    await this.page.waitForLoadState('domcontentloaded');

    await this.priceToDropdown.selectOption({ value: to }, { noWaitAfter: false });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getAmountOfSearchResult(): Promise<number> {
    const text = await this.searchResultAmmount.textContent();
    const amount = text?.replace('.', '').match(/\d+/);
    if (!!amount && amount.length > 0) {
      return Number(amount[0]);
    }

    throw new Error('No search results');
  }

  async openHouse(index = 0): Promise<void> {
    await this.searchedItems.nth(index).click({ position: { x: 10, y: 10 } });
  }

  async getStreatNameAndNumber(index = 0): Promise<string> {
    const streetAndNumber = this.searchedItems.nth(index).getByTestId('street-name-house-number');
    await expect(streetAndNumber).not.toBeEmpty();

    return (await streetAndNumber.textContent())!.trim();
  }

  async getZipCodeAndCity(index = 0): Promise<string> {
    const zipAndCity = this.searchedItems.nth(index).getByTestId('postal-code-city');
    await expect(zipAndCity).not.toBeEmpty();

    return (await zipAndCity.textContent())!.trim();
  }
}
