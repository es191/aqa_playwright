import { test } from '@playwright/test';
import { f } from '../support/functions';

test.describe('To add 8 items with sale', () => {
	test.beforeEach(async ({ page }) => {
		await f.auth.loginWeb(page);
		await f.shop.clearCartIfNotEmpty(page);
	});
	test('Test 1', async ({ page }) => {
		await f.shop.addProductsToCartWithSale(page, 8);
		await f.shop.openBasketIcon(page);
		await f.shop.redirectToTheBasket(page);
	});
});
