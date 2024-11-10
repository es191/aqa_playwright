import { test } from '@playwright/test';
import { Auth } from '../support/functions/auth';
import { Shop } from '../support/functions/shop';

test.describe('To add 7 items and 1 item with sale is already in the basket', () => {
	const auth = new Auth();
	const shop = new Shop();
	test.beforeEach(async ({ page }) => {
		await auth.loginWeb(page);
		await shop.clearCartIfNotEmpty(page);
		await shop.addOneItemIfCartIsEmpty(page);
	});
	test('Test 2', async function ({ page }) {
		await shop.addProductsToNotEmptyCartWithSale(page, 7);
		await shop.openBasketIcon(page);
		await shop.redirectToTheBasket(page);
	});
});
