import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ActivitiesService } from '@services/activities.service';

@Component({
	selector: 'app-activities-form',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './activities-form.component.html',
	styleUrl: './activities-form.component.scss'
})
export class ActivitiesFormComponent implements OnInit {
	activitiesForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private activitiesService: ActivitiesService,
		private router: Router
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

	}

	onSubmit(): void {
		if (this.activitiesForm.valid) {
			this.activitiesService.createActivity(this.activitiesForm.value).subscribe((data: any) => {
				console.log('Intercambio creado', data);
				this.router.navigate(['/activities']);
			});
		} else {
			console.log('Formulario no válido');
		}
	}
}
