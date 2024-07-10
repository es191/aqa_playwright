import { test } from '@playwright/test';
import { f } from '../support/functions';

test.describe('To add 1 item without sale', () => {
	test.beforeEach(async ({ page }) => {
		await f.auth.loginWeb(page);
		await f.shop.clearCartIfNotEmpty(page);
	});
	test('Test 4', async ({ page }) => {
		await f.shop.addProductsToCartWithoutSale(page);
		await f.shop.openBasketIcon(page);
		await f.shop.redirectToTheBasket(page);
	});
});
