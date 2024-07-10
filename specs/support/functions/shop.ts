import { Page, expect } from '@playwright/test';
import { d } from '../../fixtures';
import { e } from '../elements';

export const shop = {
	async addProductsToCartWithSale(page: Page, numberOfProductsToAdd: number) {
		const buttonSelector = e.shopUI.btnBuyItem;
		await page.click(e.shopUI.saleOnly);
		await page.waitForSelector(buttonSelector);

		for (let i = 0; i < numberOfProductsToAdd; i++) {
			await page.click(buttonSelector);
			await page.waitForTimeout(600);
		}

		const basketCount = await page.$eval(e.shopUI.itemNumbersBasket, (el) => {
			if (!el || !el.textContent) {
				return 0;
			}
			return parseInt(el.textContent.trim(), 10);
		});
		expect(basketCount).toBe(numberOfProductsToAdd);
	},

	async addProductsToNotEmptyCartWithSale(page: Page, numberOfProductsToAdd: number) {
		const buttonSelector = e.shopUI.btnBuyItem;
		await page.click(e.shopUI.saleOnly);
		await page.waitForSelector(buttonSelector);

		for (let i = 0; i < numberOfProductsToAdd; i++) {
			await page.click(buttonSelector);
			await page.waitForTimeout(600);
		}

		const basketCount = await page.$eval(e.shopUI.itemNumbersBasket, (el) => {
			if (!el || !el.textContent) {
				return 0;
			}
			return parseInt(el.textContent.trim(), 10);
		});
		expect(basketCount).toBe(numberOfProductsToAdd + 1);
	},

	async addProductsToCartWithoutSale(page: Page) {
		await page.waitForSelector(e.shopUI.itemsWithoutSale);
		const allItemsWithoutSale = await page.$$(e.shopUI.itemsWithoutSale);

		if (allItemsWithoutSale.length > 0) {
			const firstNonDiscountedItem = allItemsWithoutSale[0];
			const buyButton = await firstNonDiscountedItem.$(e.shopUI.btnBuyItem);

			if (buyButton) {
				await buyButton.click();
			}
		}
		await page.waitForTimeout(1000);
	},

	async openBasketIcon(page: Page) {
		await page.waitForSelector(e.shopUI.dropdownBasket);
		await page.click(e.shopUI.dropdownBasket);

		await page.waitForSelector(e.shopUI.popUpBasket);
		const dropdownMenu = await page.waitForSelector(e.shopUI.popUpBasket);
		const basketPriceElement = await page.waitForSelector(e.shopUI.priceBasket);
		const basketPriceText = await basketPriceElement.innerText();
		const basketPrice = parseFloat(basketPriceText.replace(/[^\d.-]/g, ''));

		expect(await dropdownMenu.isVisible()).toBeTruthy();
		expect(basketPrice).toBeGreaterThan(0);
	},

	async redirectToTheBasket(page: Page) {
		await page.waitForSelector(e.shopUI.redirectToTheBasket);
		await page.click(e.shopUI.redirectToTheBasket);

		const currentUrl = page.url();
		expect(currentUrl).toBe(d.data.url.basketUrl);
	},

	async clearCartIfNotEmpty(page: Page) {
		await page.waitForSelector(e.shopUI.itemNumbersBasket);

		const basketCount = await page.$eval(e.shopUI.itemNumbersBasket, (el) => parseInt(el.textContent || '0', 10));

		if (basketCount > 0) {
			await page.waitForSelector(e.shopUI.dropdownBasket);
			await page.click(e.shopUI.dropdownBasket);

			await page.waitForSelector(e.shopUI.clearBasket);
			await page.click(e.shopUI.clearBasket);
			console.log('The basket has been cleaned');

			await page.waitForTimeout(1000);
			const basketCountCleared = await page.$eval(e.shopUI.itemNumbersBasket, (el) =>
				parseInt(el.textContent || '0', 10),
			);
			console.log(`Number of items in the basket: ${basketCountCleared}`);
			expect(basketCountCleared).toBe(0);
		}
	},

	async addOneItemIfCartIsEmpty(page: Page) {
		await page.waitForSelector(e.shopUI.itemNumbersBasket);
		const basketCount = await page.$eval(e.shopUI.itemNumbersBasket, (el) => parseInt(el.textContent || '0', 10));
		if (basketCount == 0) {
			await page.waitForSelector(e.shopUI.saleOnly);
			await page.click(e.shopUI.saleOnly);
			await page.waitForSelector(e.shopUI.itemsWithSale);
			await page.click(e.shopUI.btnBuyItem);
		}
		await page.waitForTimeout(1000);
		const basketCountUpdated = await page.$eval(e.shopUI.itemNumbersBasket, (el) =>
			parseInt(el.textContent || '0', 10),
		);
		console.log(`Number of items in the basket: ${basketCountUpdated}`);
		expect(basketCountUpdated).toBe(1);
	},
};
