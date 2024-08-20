import { test as base } from '@playwright/test';
import { HousePage, LoginPage, SearchPage, StartPage } from '../pages';

type MyFixtures = {
  housePage: HousePage;
  loginPage: LoginPage;
  searchPage: SearchPage;
  startPage: StartPage;
};

export const test = base.extend<MyFixtures>({
  housePage: async ({ page }, use) => {
    await use(new HousePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  startPage: async ({ page }, use) => {
    await use(new StartPage(page));
  },
});

export { expect } from '@playwright/test';
