import { defineConfig } from '@playwright/test';
import { devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests/e2e',
	timeout: 30000,
	retries: 0,
	use: {
		headless: false,
		viewport: { width: 1920, height: 1080 },
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'], headless: true },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'], headless: true },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'], headless: true },
		},
	],
});
