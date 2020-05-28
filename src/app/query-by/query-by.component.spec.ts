import { TestBed, inject } from '@angular/core/testing';

import { QueryByComponent } from './query-by.component';

describe('a query-by component', () => {
	let component: QueryByComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				QueryByComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([QueryByComponent], (QueryByComponent) => {
		component = QueryByComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});