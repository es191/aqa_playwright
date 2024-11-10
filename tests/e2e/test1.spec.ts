import { test } from '@playwright/test';
import { Auth } from '../support/functions/auth';
import { Shop } from '../support/functions/shop';

test.describe('To add 8 items with sale', () => {
	const auth = new Auth();
	const shop = new Shop();
	test.beforeEach(async ({ page }) => {
		await auth.loginWeb(page);
		await shop.clearCartIfNotEmpty(page);
	});
	test('Test 1', async function ({ page }) {
		await shop.addProductsToCartWithSale(page, 8);
		await shop.openBasketIcon(page);
		await shop.redirectToTheBasket(page);
	});
});
