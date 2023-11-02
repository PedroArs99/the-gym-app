import type { SSTConfig } from 'sst';
import { Config, SvelteKitSite } from 'sst/constructs';

export default {
	config(_input) {
		return {
			name: 'the-gym-app',
			region: 'eu-central-1'
		};
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const API_URL = new Config.Parameter(stack, 'API_URL', {
				value: 'https://5rjvidrtda.execute-api.eu-central-1.amazonaws.com'
			});

			const site = new SvelteKitSite(stack, 'site', {
				customDomain: 'the-fit-app.pro',
				environment: {
					API_URL: API_URL.value
				}
			});
			stack.addOutputs({
				url: site.url
			});
		});
	}
} satisfies SSTConfig;
