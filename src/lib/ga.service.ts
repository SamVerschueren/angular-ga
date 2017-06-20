import { Injectable, Inject, Optional, EventEmitter } from '@angular/core';

import { GA_TOKEN, GA_OPTIONS } from './ga.token';
import { Event } from './interfaces/event';
import { PageView } from './interfaces/pageview';
import { TrackingOptions } from './interfaces/tracking-options';

declare const ga: any;

@Injectable()
export class GoogleAnalyticsService {

	event = new EventEmitter<Event>();
	pageview = new EventEmitter<PageView>();

	constructor(
		@Optional() @Inject(GA_TOKEN) trackingId: string,
		@Optional() @Inject(GA_OPTIONS) options: any
	) {
		if (trackingId) {
			this.configure(trackingId, options);
		}
	}

	configure(trackingId: string, options: TrackingOptions = 'auto') {
		ga('create', trackingId, options);
		ga('send', 'pageview');

		this.event.subscribe((x: Event) => this.onEvent(x));
		this.pageview.subscribe((x: PageView) => this.onPageView(x));
	}

	set(fieldsObject: any): void;
	set(fieldName: string, fieldValue: any): void;
	set(key: any, value?: any) {
		if (typeof key !== 'string' && typeof key !== 'object') {
			throw new TypeError(`Expected \`fieldName\` to be of type \`string\` or \`object\`, got \`${typeof key}\``);
		}

		if (typeof key === 'string' && value === undefined) {
			throw new TypeError(`Expected \`fieldValue\` to not be \`undefined\``);
		}

		if (typeof key === 'object') {
			ga('set', key);
		} else {
			ga('set', key, value);
		}
	}

	private onEvent(event: Event) {
		ga('send', 'event', event.category, event.action, event.label, event.value);
	}

	private onPageView(pageview: PageView) {
		const fieldsObject: any = {};

		if (pageview.title) {
			fieldsObject.title = pageview.title;
		}

		ga('send', 'pageview', pageview.page, fieldsObject);
	}
}
