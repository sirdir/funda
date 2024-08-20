import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.locator('#UserName');
    this.password = page.locator('#Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
  }

  async loginAs(email = '', password = '') {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
