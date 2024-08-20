import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('accept cookies', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: /Afwijzen en sluiten/ }).click();
  await page.context().storageState({ path: authFile });
});
