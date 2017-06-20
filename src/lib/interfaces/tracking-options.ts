export interface TrackingOptions {
	name?: string;
	storage?: string;
	clientId?: string;
	sampleRate?: number;
	siteSpeedSampleRate?: number;
	alwaysSendReferrer?: boolean;
	allowAnchor?: boolean;
	cookieName?: string;
	cookieDomain?: string;
	cookieExpires?: number;
	legacyCookieDomain?: string;
	legacyHistoryImport?: boolean;
	allowLinker?: boolean;
}
