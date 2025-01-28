export class testData {
	static readonly baseUrl: string = process.env.BASE || '';
	static readonly loginUrl: string = `${testData.baseUrl}/login`;
	static readonly basketUrl: string = `${testData.baseUrl}/basket`;
	static readonly clearBasketUrl: string = `${testData.baseUrl}/basket/clear`;

	static userLogin: string = process.env.LOGIN || '';
	static userPassword: string = process.env.PASSWORD || '';
}
