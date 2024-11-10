export class testData {
	static baseUrl: string = process.env.BASE || '';
	static loginUrl: string = `${testData.baseUrl}/login`;
	static basketUrl: string = `${testData.baseUrl}/basket`;
	static clearBasketUrl: string = `${testData.baseUrl}/basket/clear`;

	static userLogin: string = process.env.LOGIN || '';
	static userPassword: string = process.env.PASSWORD || '';
}
