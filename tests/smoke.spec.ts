import { test, expect } from '@playwright/test';
import { StartPage } from './pages/StartPage';

test.describe('funda smoke test suite', () => {
  test('user can search te koop in Amsterdam', async ({ page }) => {
    const startPage = new StartPage(page);
    await startPage.goto();
    const searchPage = await startPage.search('amsterdam');

    await expect(searchPage.header).toHaveText(
      /\d{0,3}\.?\d{1,3}\s+\n\s+koopwoningen/,
    );
    await expect(searchPage.searchedItems).toHaveCount(15);
  });
});
