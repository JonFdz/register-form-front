import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ActivitiesService } from '@services/activities.service';
import { DialogComponent } from '@sharedcontent/dialog/dialog.component';

@Component({
	selector: 'app-activities-form',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './activities-form.component.html',
	styleUrl: './activities-form.component.scss'
})
export class ActivitiesFormComponent implements OnInit {
	activitiesForm: FormGroup;
	activityId: number | null = null;

	constructor(
		private fb: FormBuilder,
		private activitiesService: ActivitiesService,
		private router: Router,
		private route: ActivatedRoute,
		private dialog: MatDialog
	) {
		this.activitiesForm = this.fb.group({
			activity_name: ['', Validators.required],
			instructor: ['', Validators.required],
			day: ['', Validators.required],
			hour: ['', Validators.required],
			category: [''],
			description: ['']
		});
	}

	ngOnInit(): void {
		const stringActivityId = this.route.snapshot.paramMap.get('id');
		this.activityId = stringActivityId ? +stringActivityId : null;
		if (this.activityId) {
			this.loadActivityData(this.activityId);
		}
	}

	loadActivityData(activityId: number): void {
		this.activitiesService.getActivity(activityId).subscribe((activity: any) => {
			this.activitiesForm.patchValue(activity);

			this.highlightInvalidFields(this.activitiesForm);
		});
	}

	resetForm(): void {
		this.activitiesForm.reset();
		this.highlightInvalidFields(this.activitiesForm);
	}

	openDialog(component: string, status: 'success' | 'error', message: string): void {
		this.dialog.open(DialogComponent, {
			data: {component, status, message }
		});
		this.dialog.afterAllClosed.subscribe(() => {
			window.scrollTo(0, 0);
		});
	}

	highlightInvalidFields(form: FormGroup) {
		Object.keys(form.controls).forEach((field) => {
			const control = form.get(field);

			const element = document.getElementById(field);
			if (element) {
				if (control?.invalid) {
					if (control.hasError('required')) {
						element.classList.add('error');
						element.classList.remove('success', 'optional');
					}
				} else if (control?.value === null || control?.value === '' || control?.value === undefined) {
					element.classList.add('optional');
					element.classList.remove('success', 'error');
					control?.markAsPristine();
					control?.markAsUntouched();
				} else {
					element.classList.add('success');
					element.classList.remove('error', 'optional');
				}
			}
		});
	}

	onSubmit(): void {
		if (this.activitiesForm.invalid) {
				this.highlightInvalidFields(this.activitiesForm);
				this.openDialog('Status', 'error', 'Revisa els camps marcats en vermell.');
		} else {
			if (this.activityId) {
				this.activitiesService.updateActivity(this.activityId, this.activitiesForm.value).subscribe(() => {
					this.openDialog('Status', 'success', 'Intercanvi actualitzat correctament');
					console.log('Activity updated');
					this.router.navigate(['activities/']);
				});
			} else {
				this.activitiesService.createActivity(this.activitiesForm.value).subscribe(() => {
					this.openDialog('Status', 'success', 'Intercanvi creat correctament');
					console.log('Activity created');
					this.activitiesForm.reset();
					this.router.navigate(['activities/']);
				});
			}
		}
	}
}
