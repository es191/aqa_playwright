import { test } from '@playwright/test';
import { f } from '../support/functions';

test.describe('To add 1 item with sale', () => {
	test.beforeEach(async ({ page }) => {
		await f.auth.loginWeb(page);
		await f.shop.clearCartIfNotEmpty(page);
	});
	test('Test 3', async ({ page }) => {
		await f.shop.addProductsToCartWithSale(page, 1);
		await f.shop.openBasketIcon(page);
		await f.shop.redirectToTheBasket(page);
	});
});
