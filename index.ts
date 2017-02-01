import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import { GoogleAnalyticsService } from './src/ga.service';

export { GA_TOKEN } from './src/ga.token';

@NgModule()
export class GoogleAnalyticsModule {
	static forRoot(provider?: Provider): ModuleWithProviders {
		return {
			ngModule: GoogleAnalyticsModule,
			providers: [
				GoogleAnalyticsService,
				provider
			]
		};
	}
}
