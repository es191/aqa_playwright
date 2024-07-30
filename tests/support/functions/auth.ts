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
		await page.type(AuthUI.loginClient, Data.userLogin, { delay: 100 });
		await page.type(AuthUI.passwordClient, Data.userPassword, {
			delay: 100,
		});
		await page.click(AuthUI.btnLogin);
		expect(page.isVisible(ShopUI.dropdownBasket));
	},
};
