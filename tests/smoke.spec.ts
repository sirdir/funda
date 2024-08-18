import { test, expect } from '@playwright/test';

test.describe('funda smoke test suite', () => {
  test('user can search te koop in Amsterdam', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('search-box').fill('amsterdam');
    await page.getByTestId('SearchBox-location-suggestion').first().click();
    await expect(
      page.locator('[data-test-id="search-result-item"]'),
    ).toHaveCount(15);
  });
});
