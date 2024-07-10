import { Page, expect } from '@playwright/test';
import { d } from '../../fixtures';
import { e } from '../elements';

export const auth = {
	async loginWeb(page: Page) {
		await page.goto(d.data.url.baseUrl);
		await page.click(e.authUI.linkLogin);
		// .fill is so fast in that case, much better to use .type
		await page.type(e.authUI.loginClient, d.data.user.login, { delay: 100 });
		await page.type(e.authUI.passwordClient, d.data.user.password, {
			delay: 100,
		});
		await page.click(e.authUI.btnLogin);
		expect(page.isVisible(e.shopUI.dropdownBasket));
	},
};
