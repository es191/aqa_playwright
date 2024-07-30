import { Page, expect } from '@playwright/test';
import AuthUI from '../elements/authUI';
import ShopUI from '../elements/shopUI';
import Data from '../../fixtures/data';

interface AuthAction {
	loginWeb(page: Page): Promise<void>;
}

export const auth: AuthAction = {
	async loginWeb(page: Page) {
		await page.goto(Data.baseUrl);
		await page.click(AuthUI.linkLogin);
		await page.fill(AuthUI.loginClient, Data.userLogin, { timeout: 100 });
		await page.fill(AuthUI.passwordClient, Data.userPassword, {
			timeout: 100,
		});
		await page.click(AuthUI.btnLogin);
		expect(page.isVisible(ShopUI.dropdownBasket));
	},
};
