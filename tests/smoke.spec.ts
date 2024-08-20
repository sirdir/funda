import { test, expect } from '@playwright/test';
import { LoginPage, StartPage, HousePage, SearchPage } from './pages';

test.describe('funda smoke test suite', () => {
  test('user can search house to buy in Amsterdam by price range', async ({ page }) => {
    const startPage = new StartPage(page);
    await startPage.goto();

    const searchPage = await startPage.search('amsterdam');
    await expect(searchPage.page).toHaveURL('/zoeken/koop?selected_area=%5B%22amsterdam%22%5D');
    await searchPage.page.waitForLoadState('domcontentloaded');

    await expect(searchPage.header).toHaveText(/\d{0,3}\.?\d{1,3}\s+\n\s+koopwoningen/);
    await expect(searchPage.searchedItems).toHaveCount(15);
    expect(await searchPage.getZipCodeAndCity(0)).toContain('Amsterdam');

    const searchAmountBeforeFilter = await searchPage.getAmountOfSearchResult();

    await searchPage.filterByPriceRange('250000', '500000');

    await expect(searchPage.searchedItems).toHaveCount(15);

    await expect(searchPage.header).toHaveText(/\d{0,3}\.?\d{1,3}\s+\n\s+koopwoningen/);
    const searchAmountAfterFilter = await searchPage.getAmountOfSearchResult();
    expect(await searchPage.getZipCodeAndCity(0)).toContain('Amsterdam');

    expect(searchAmountBeforeFilter).toBeGreaterThan(searchAmountAfterFilter);
  });

  test('user can open an advertisement', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto('/zoeken/koop?selected_area=%5B%22amsterdam%22%5D');
    await searchPage.page.waitForLoadState('domcontentloaded');

    const streat = await searchPage.getStreatNameAndNumber(0);
    const zipAndCity = await searchPage.getZipCodeAndCity(0);

    await searchPage.openHouse(0);

    await expect(page).toHaveTitle(new RegExp(`Appartement te koop: ${streat} ${zipAndCity}`));
  });

  test('user can see phone of makelaar', async ({ page }) => {
    const housePage = new HousePage(page);
    await housePage.goto('/detail/koop/utrecht/appartement-steve-bikostraat-93/43659568/');
    await expect(housePage.phone).toBeHidden();
    await housePage.unhidePhone();
    await expect(housePage.phone).toBeVisible();
    await expect(housePage.phone).toHaveText(/Bel 030-7523333/);
  });

  test('user will return to ad-page after login', async ({ page }) => {
    const housePage = new HousePage(page);
    await housePage.goto('/detail/koop/lelystad/huis-griend-12-27/89031085/');
    const loginPage = await housePage.openLoginPage();

    await loginPage.loginAs(process.env.TEST_USER, process.env.TEST_PASSWORD);

    await expect(page).toHaveURL('/detail/koop/lelystad/huis-griend-12-27/89031085/');
  });

  test('user can open the map from search', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto('/zoeken/koop?selected_area=%5B%22lelystad%22%5D');
    await searchPage.openMap();

    await expect(page).toHaveTitle('Zoek huizen te koop op de kaart [funda]');
  });
});
