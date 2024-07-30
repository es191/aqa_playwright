class Data {
	static baseUrl: string = process.env.BASE || '';
	static loginUrl: string = `${Data.baseUrl}/login`;
	static basketUrl: string = `${Data.baseUrl}/basket`;
	static clearBasketUrl: string = `${Data.baseUrl}/basket/clear`;

	static userLogin: string = process.env.LOGIN || '';
	static userPassword: string = process.env.PASSWORD || '';
}

export default Data;
