import { expect, type Locator, type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class HousePage {
  readonly page: Page;
  readonly showPhone: Locator;
  readonly phone: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.showPhone = page.getByRole('button', { name: 'Toon telefoonnummer' }).nth(0);
    this.phone = page.getByRole('button', { name: 'Bel 030-' }).nth(0);
    this.loginButton = page.getByRole('button', { name: 'Inloggen' });
  }

  async goto(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async unhidePhone() {
    await this.showPhone.click();
  }

  async openLoginPage(): Promise<LoginPage> {
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/.*\/account\/login.*/);

    return new LoginPage(this.page);
  }
}
