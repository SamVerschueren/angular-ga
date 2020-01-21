import {Injectable, Inject, Optional, EventEmitter} from '@angular/core';
import {ReplaySubject, timer, throwError, interval} from 'rxjs';
import {tap, switchMap, takeUntil, filter, first} from 'rxjs/operators';

import {GA_TOKEN, GA_OPTIONS} from './ga.token';
import {Event} from './interfaces/event';
import {PageView} from './interfaces/pageview';
import {TrackingOptions} from './interfaces/tracking-options';

@Injectable()
export class GoogleAnalyticsService {
	event: EventEmitter<Event> = new EventEmitter<Event>();
	pageview: EventEmitter<PageView> = new EventEmitter<PageView>();
	private readonly queue: ReplaySubject<unknown[]> = new ReplaySubject<unknown[]>();

	constructor(
		@Optional() @Inject(GA_TOKEN) trackingId: string,
		@Optional() @Inject(GA_OPTIONS) options: TrackingOptions | string
	) {
		if (trackingId) {
			this.configure(trackingId, options);
		}
	}

	configure(trackingId: string, options: TrackingOptions | string = 'auto'): void {
		this.ga('create', trackingId, options);
		this.ga('send', 'pageview');

		this.event.subscribe((x: Event) => {
			this.onEvent(x);
		});

		this.pageview.subscribe((x: PageView) => {
			this.onPageView(x);
		});

		const timer$ = timer(20_000)
			.pipe(
				switchMap(() => throwError(new Error('Could not load GA')))
			);

		interval(50)
			.pipe(
				takeUntil(timer$),
				filter(() => Boolean((window as any).ga)),
				first(),
				switchMap(() => this.queue),
				tap(args => {
					(window as any).ga(...args); // tslint:disable-line:no-unsafe-any
				})
			)
			.subscribe();
	}

	set(fieldsObject: any): void;
	set(fieldName: string, fieldValue: any): void;
	set(key: any, value?: any): void {
		if (typeof key !== 'string' && typeof key !== 'object') {
			throw new TypeError(`Expected \`fieldName\` to be of type \`string\` or \`object\`, got \`${typeof key}\``);
		}

		if (typeof key === 'string' && value === undefined) {
			throw new TypeError('Expected `fieldValue` to not be `undefined`');
		}

		if (typeof key === 'object') {
			this.ga('set', key);
		} else {
			this.ga('set', key, value);
		}
	}

	private onEvent(event: Event): void {
		this.ga('send', 'event', event.category, event.action, event.label, event.value);
	}

	private onPageView(pageview: PageView): void {
		const fieldsObject: {title?: string} = {};

		if (pageview.title) {
			fieldsObject.title = pageview.title;
		}

		this.ga('send', 'pageview', pageview.page, fieldsObject);
	}

	private ga(...args: unknown[]): void {
		this.queue.next(args);
	}
}
