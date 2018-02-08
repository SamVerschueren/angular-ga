import {Injectable, Inject, Optional, EventEmitter} from '@angular/core';

import {GA_TOKEN, GA_OPTIONS} from './ga.token';
import {Event} from './interfaces/event';
import {PageView} from './interfaces/pageview';
import {TrackingOptions} from './interfaces/tracking-options';

declare const ga: any;

@Injectable()
export class GoogleAnalyticsService {
	event = new EventEmitter<Event>();
	pageview = new EventEmitter<PageView>();
	sendCommand: string = 'send';
	setCommand: string = 'set';

	constructor(
		@Optional() @Inject(GA_TOKEN) trackingId: string,
		@Optional() @Inject(GA_OPTIONS) options: any
	) {
		if (trackingId) {
			this.configure(trackingId, options);
		}
	}

	configure(trackingId: string, options: TrackingOptions | string = 'auto') {
		if (typeof options === 'object' && options.namedTracker) {
			if (typeof options.name === 'string' && !options.name) {
				throw new TypeError('Expected `options.name` to not be `undefined`');
			}

			this.sendCommand = options.name + '.send';
			this.setCommand = options.name + '.set';
		}

		ga('create', trackingId, options);
		ga(this.sendCommand, 'pageview');

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
			throw new TypeError('Expected `fieldValue` to not be `undefined`');
		}

		if (typeof key === 'object') {
			ga(this.setCommand, key);
		} else {
			ga(this.setCommand, key, value);
		}
	}

	private onEvent(event: Event) {
		ga(this.sendCommand, 'event', event.category, event.action, event.label, event.value);
	}

	private onPageView(pageview: PageView) {
		const fieldsObject: any = {};

		if (pageview.title) {
			fieldsObject.title = pageview.title;
		}

		ga(this.sendCommand, 'pageview', pageview.page, fieldsObject);
	}
}
