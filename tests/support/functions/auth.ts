import { Page, expect } from '@playwright/test';
import AuthUI from '../elements/authUI';
import ShopUI from '../elements/shopUI';
import { testData } from '../../fixtures/testData';
export class Auth {
	async loginWeb(page: Page): Promise<void> {
		await page.goto(testData.baseUrl);
		await page.click(AuthUI.linkLogin);
		await page.fill(AuthUI.loginClient, testData.userLogin, { timeout: 100 });
		await page.fill(AuthUI.passwordClient, testData.userPassword, {
			timeout: 100,
		});
		await page.click(AuthUI.btnLogin);
		expect(page.isVisible(ShopUI.dropdownBasket));
	}
}
