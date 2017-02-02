import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import { GoogleAnalyticsService } from './ga.service';

@NgModule({
	imports: [],
	declarations: [],
	exports: []
})
export class GoogleAnalyticsModule {
	static forRoot(provider: Provider): ModuleWithProviders {
		return {
			ngModule: GoogleAnalyticsModule,
			providers: [
				provider,
				GoogleAnalyticsService
			]
		};
	}
}
