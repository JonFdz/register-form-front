import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesDetailsComponent } from './activities-details.component';

describe('VmDetailsComponent', () => {
	let component: ActivitiesDetailsComponent;
	let fixture: ComponentFixture<ActivitiesDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ActivitiesDetailsComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(ActivitiesDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
