import { test } from '@playwright/test';
import { f } from '../support/functions';

test.describe('To add 7 items and 1 item with sale is already in the basket', () => {
	test.beforeEach(async ({ page }) => {
		await f.auth.loginWeb(page);
		await f.shop.clearCartIfNotEmpty(page);
		await f.shop.addOneItemIfCartIsEmpty(page);
	});
	test('Test 2', async ({ page }) => {
		await f.shop.addProductsToNotEmptyCartWithSale(page, 7);
		await f.shop.openBasketIcon(page);
		await f.shop.redirectToTheBasket(page);
	});
});
