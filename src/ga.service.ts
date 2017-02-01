import { Injectable, Inject, EventEmitter } from '@angular/core';

import { GA_TOKEN } from './ga.token';
import { Event } from './interfaces/event';
import { PageView } from './interfaces/pageview';

declare const ga: any;

@Injectable()
export class GoogleAnalyticsService {

	event = new EventEmitter<Event>();
	pageview = new EventEmitter<PageView>();

	constructor(
		@Inject(GA_TOKEN) trackingId: string
	) {
		ga('create', trackingId, 'auto');
		ga('send', 'pageview');

		this.event.subscribe((x: Event) => this.onEvent(x));
		this.pageview.subscribe((x: PageView) => this.onPageView(x));
	}

	private onEvent(event: Event) {
		ga('send', 'event', event.category, event.action, event.label, event.value);
	}

	private onPageView(pageview: PageView) {
		ga('send', 'pageview', pageview.page);
	}
}
