import {InjectionToken} from '@angular/core';

import {TrackingOptions} from './interfaces/tracking-options';

export const GA_TOKEN = new InjectionToken<string>('angular-ga TrackingId');
export const GA_OPTIONS = new InjectionToken<TrackingOptions | string>('angular-ga Tracking Options');
