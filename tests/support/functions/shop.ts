import { Page, expect } from '@playwright/test';
import ShopUI from '../elements/shopUI';
import { testData } from '../../fixtures/testData';

export class Shop {
	async addProductsToCartWithSale(page: Page, numberOfProductsToAdd: number): Promise<void> {
		const buttonSelector: string = ShopUI.btnBuyItem;
		await page.click(ShopUI.saleOnly);
		await page.waitForSelector(buttonSelector);

		for (let i = 0; i < numberOfProductsToAdd; i++) {
			await page.click(buttonSelector);
			await page.waitForTimeout(600);
		}

		const basketCount: number = await page.evaluate(ShopUI.itemNumbersBasket, (el: { textContent: string }) => {
			if (!el || !el.textContent) {
				return 0;
			}
			return parseInt(el.textContent.trim(), 10);
		});
		expect(basketCount).toBe(numberOfProductsToAdd);
	}

	async addProductsToNotEmptyCartWithSale(page: Page, numberOfProductsToAdd: number): Promise<void> {
		const buttonSelector: string = ShopUI.btnBuyItem;
		await page.click(ShopUI.saleOnly);
		await page.waitForSelector(buttonSelector);

		for (let i = 0; i < numberOfProductsToAdd; i++) {
			await page.click(buttonSelector);
			await page.waitForTimeout(600);
		}

		const basketCount: number = await page.evaluate(ShopUI.itemNumbersBasket, (el: { textContent: string }) => {
			if (!el || !el.textContent) {
				return 0;
			}
			return parseInt(el.textContent.trim(), 10);
		});
		expect(basketCount).toBe(numberOfProductsToAdd + 1);
	}

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
	}

	async openBasketIcon(page: Page): Promise<void> {
		await page.waitForSelector(ShopUI.dropdownBasket);
		await page.click(ShopUI.dropdownBasket);

		await page.waitForSelector(ShopUI.popUpBasket);
		const dropdownMenu = await page.waitForSelector(ShopUI.popUpBasket);
		const basketPriceElement = await page.waitForSelector(ShopUI.priceBasket);
		const basketPriceText: string = await basketPriceElement.innerText();
		const basketPrice: number = parseFloat(basketPriceText.replace(/[^\d.-]/g, ''));

		expect(await dropdownMenu.isVisible()).toBeTruthy();
		expect(basketPrice).toBeGreaterThan(0);
	}

	async redirectToTheBasket(page: Page): Promise<void> {
		await page.waitForSelector(ShopUI.redirectToTheBasket);
		await page.click(ShopUI.redirectToTheBasket);

		const currentUrl: string = page.url();
		expect(currentUrl).toBe(testData.basketUrl);
	}

	async clearCartIfNotEmpty(page: Page): Promise<void> {
		await page.waitForSelector(ShopUI.itemNumbersBasket);

		const basketCount: number = await page.evaluate(ShopUI.itemNumbersBasket, (el: { textContent: string }) =>
			parseInt(el.textContent || '0', 10),
		);

		if (basketCount > 0) {
			await page.waitForSelector(ShopUI.dropdownBasket);
			await page.click(ShopUI.dropdownBasket);

			await page.waitForSelector(ShopUI.clearBasket);
			await page.click(ShopUI.clearBasket);
			console.log('The basket has been cleaned');

			await page.waitForTimeout(1000);
			const basketCountCleared: number = await page.evaluate(
				ShopUI.itemNumbersBasket,
				(el: { textContent: string }) => parseInt(el.textContent || '0', 10),
			);
			console.log(`Number of items in the basket: ${basketCountCleared}`);
			expect(basketCountCleared).toBe(0);
		}
	}

	async addOneItemIfCartIsEmpty(page: Page): Promise<void> {
		await page.waitForSelector(ShopUI.itemNumbersBasket);
		const basketCount: number = await page.evaluate(ShopUI.itemNumbersBasket, (el: { textContent: string }) =>
			parseInt(el.textContent || '0', 10),
		);
		if (basketCount == 0) {
			await page.waitForSelector(ShopUI.saleOnly);
			await page.click(ShopUI.saleOnly);
			await page.waitForSelector(ShopUI.itemsWithSale);
			await page.click(ShopUI.btnBuyItem);
		}
		await page.waitForTimeout(1000);
		const basketCountUpdated: number = await page.evaluate(
			ShopUI.itemNumbersBasket,
			(el: { textContent: string }) => parseInt(el.textContent || '0', 10),
		);
		console.log(`Number of items in the basket: ${basketCountUpdated}`);
		expect(basketCountUpdated).toBe(1);
	}
}
