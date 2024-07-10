import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './specs/e2e',
	timeout: 30000,
	retries: 0,
	use: {
		headless: false,
		viewport: { width: 1920, height: 1080 },
	},
});
