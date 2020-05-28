import { TestBed, inject } from '@angular/core/testing';

import { UrlBuilderComponent } from './url-builder.component';

describe('a url-builder component', () => {
	let component: UrlBuilderComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UrlBuilderComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([UrlBuilderComponent], (UrlBuilderComponent) => {
		component = UrlBuilderComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});