# angular-ga [![Build Status](https://travis-ci.org/SamVerschueren/angular-ga.svg?branch=master)](https://travis-ci.org/SamVerschueren/angular-ga)

> Google Analytics for your Angular application


## Install

```
$ npm install --save angular-ga
```


## Usage

### Configuration

The Google Analytics tracking script is not included in this module. Make sure to add it to your page.

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleAnalyticsModule, GA_TOKEN } from 'angular-ga';

import { AppComponent } from './app.component';

@NgModule({
	imports: [
		BrowserModule,
		GoogleAnalyticsModule.forRoot({
			provide: GA_TOKEN,
			useValue: 'UA-TOKEN-1'
		})
	],
	declarations: [
		AppComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
```

### Service

Inject the `GoogleAnalyticsService` into your components or services.

```js
import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from 'angular-ga';

@Component({
	moduleId: module.id,
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

	constructor(
		private gaService: GoogleAnalyticsService
	) { }

	ngOnInit() {
		this.gaService.event.emit({
			category: 'app',
			action: 'bootstrap'
		});
	}
}
```


## API

### service.event.emit(event: Event)

Emit a Google Analytics event.

#### event

##### category

Type: `string`

Typically the object that was interacted with (e.g. `Video`)

##### action

Type: `string`

The type of interaction (e.g. `play`)

##### label

*Optional*<br>
Type: `string`

Useful for categorizing events (e.g. `Fall Campaign`)

##### value

*Optional*<br>
Type: `number`

A numeric value associated with the event (e.g. `42`)

### service.pageview.emit(pageview: PageView)

Emit a Google Analytics page view.

#### pageview

##### page

Type: `string`

The path portion of a URL. This value should start with a slash (/) character.


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
