import {NgModule, ModuleWithProviders} from '@angular/core';

import {GoogleAnalyticsService} from './ga.service';

@NgModule({
	imports: [],
	declarations: [],
	exports: []
})
export class GoogleAnalyticsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: GoogleAnalyticsModule,
			providers: [
				GoogleAnalyticsService
			]
		};
	}
}
