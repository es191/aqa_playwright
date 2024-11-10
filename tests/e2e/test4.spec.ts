import { test } from '@playwright/test';
import { Auth } from '../support/functions/auth';
import { Shop } from '../support/functions/shop';

test.describe('To add 1 item without sale', () => {
	const auth = new Auth();
	const shop = new Shop();
	test.beforeEach(async ({ page }) => {
		await auth.loginWeb(page);
		await shop.clearCartIfNotEmpty(page);
	});
	test('Test 4', async function ({ page }) {
		await shop.addProductsToCartWithoutSale(page);
		await shop.openBasketIcon(page);
		await shop.redirectToTheBasket(page);
	});
});
