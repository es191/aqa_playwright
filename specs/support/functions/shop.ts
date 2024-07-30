import { Page, expect } from '@playwright/test';
import ShopUI from '../elements/shopUI';
import Data from '../../fixtures/data';

interface ShopActions {
	addProductsToCartWithSale(page: Page, numberOfProductsToAdd: number): Promise<void>;
	addProductsToNotEmptyCartWithSale(page: Page, numberOfProductsToAdd: number): Promise<void>;
	addProductsToCartWithoutSale(page: Page): Promise<void>;
	openBasketIcon(page: Page): Promise<void>;
	redirectToTheBasket(page: Page): Promise<void>;
	clearCartIfNotEmpty(page: Page): Promise<void>;
	addOneItemIfCartIsEmpty(page: Page): Promise<void>;
}

export const shop: ShopActions = {
	async addProductsToCartWithSale(page: Page, numberOfProductsToAdd: number) {
		const buttonSelector = ShopUI.btnBuyItem;
		await page.click(ShopUI.saleOnly);
		await page.waitForSelector(buttonSelector);

		for (let i = 0; i < numberOfProductsToAdd; i++) {
			await page.click(buttonSelector);
			await page.waitForTimeout(600);
		}

		const basketCount = await page.$eval(ShopUI.itemNumbersBasket, (el) => {
			if (!el || !el.textContent) {
				return 0;
			}
			return parseInt(el.textContent.trim(), 10);
		});
		expect(basketCount).toBe(numberOfProductsToAdd);
	},

	async addProductsToNotEmptyCartWithSale(page: Page, numberOfProductsToAdd: number) {
		const buttonSelector = ShopUI.btnBuyItem;
		await page.click(ShopUI.saleOnly);
		await page.waitForSelector(buttonSelector);

		for (let i = 0; i < numberOfProductsToAdd; i++) {
			await page.click(buttonSelector);
			await page.waitForTimeout(600);
		}

		const basketCount = await page.$eval(ShopUI.itemNumbersBasket, (el) => {
			if (!el || !el.textContent) {
				return 0;
			}
			return parseInt(el.textContent.trim(), 10);
		});
		expect(basketCount).toBe(numberOfProductsToAdd + 1);
	},

	async addProductsToCartWithoutSale(page: Page) {
		await page.waitForSelector(ShopUI.itemsWithoutSale);
		const allItemsWithoutSale = await page.$$(ShopUI.itemsWithoutSale);

		if (allItemsWithoutSale.length > 0) {
			const firstNonDiscountedItem = allItemsWithoutSale[0];
			const buyButton = await firstNonDiscountedItem.$(ShopUI.btnBuyItem);

			if (buyButton) {
				await buyButton.click();
			}
		}
		await page.waitForTimeout(1000);
	},

	async openBasketIcon(page: Page) {
		await page.waitForSelector(ShopUI.dropdownBasket);
		await page.click(ShopUI.dropdownBasket);

		await page.waitForSelector(ShopUI.popUpBasket);
		const dropdownMenu = await page.waitForSelector(ShopUI.popUpBasket);
		const basketPriceElement = await page.waitForSelector(ShopUI.priceBasket);
		const basketPriceText = await basketPriceElement.innerText();
		const basketPrice = parseFloat(basketPriceText.replace(/[^\d.-]/g, ''));

		expect(await dropdownMenu.isVisible()).toBeTruthy();
		expect(basketPrice).toBeGreaterThan(0);
	},

	async redirectToTheBasket(page: Page) {
		await page.waitForSelector(ShopUI.redirectToTheBasket);
		await page.click(ShopUI.redirectToTheBasket);

		const currentUrl = page.url();
		expect(currentUrl).toBe(Data.basketUrl);
	},

	async clearCartIfNotEmpty(page: Page) {
		await page.waitForSelector(ShopUI.itemNumbersBasket);

		const basketCount = await page.$eval(ShopUI.itemNumbersBasket, (el) => parseInt(el.textContent || '0', 10));

		if (basketCount > 0) {
			await page.waitForSelector(ShopUI.dropdownBasket);
			await page.click(ShopUI.dropdownBasket);

			await page.waitForSelector(ShopUI.clearBasket);
			await page.click(ShopUI.clearBasket);
			console.log('The basket has been cleaned');

			await page.waitForTimeout(1000);
			const basketCountCleared = await page.$eval(ShopUI.itemNumbersBasket, (el) =>
				parseInt(el.textContent || '0', 10),
			);
			console.log(`Number of items in the basket: ${basketCountCleared}`);
			expect(basketCountCleared).toBe(0);
		}
	},

	async addOneItemIfCartIsEmpty(page: Page) {
		await page.waitForSelector(ShopUI.itemNumbersBasket);
		const basketCount = await page.$eval(ShopUI.itemNumbersBasket, (el) => parseInt(el.textContent || '0', 10));
		if (basketCount == 0) {
			await page.waitForSelector(ShopUI.saleOnly);
			await page.click(ShopUI.saleOnly);
			await page.waitForSelector(ShopUI.itemsWithSale);
			await page.click(ShopUI.btnBuyItem);
		}
		await page.waitForTimeout(1000);
		const basketCountUpdated = await page.$eval(ShopUI.itemNumbersBasket, (el) =>
			parseInt(el.textContent || '0', 10),
		);
		console.log(`Number of items in the basket: ${basketCountUpdated}`);
		expect(basketCountUpdated).toBe(1);
	},
};
