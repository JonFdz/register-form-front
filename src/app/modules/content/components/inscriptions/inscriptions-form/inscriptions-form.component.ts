import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, merge, throwError } from 'rxjs';

import { UsersService } from '@services/users.service';
import { ActivitiesService } from '@services/activities.service';
import { InscriptionsService } from '@services/inscriptions.service';

import { User } from '@models/user.model';
import { Activity } from '@models/activity.model';
import { Inscription } from '@models/inscription.model';

@Component({
	selector: 'app-inscriptions-form',
	templateUrl: './inscriptions-form.component.html',
	styleUrls: ['./inscriptions-form.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule]
})
export class InscriptionsFormComponent implements OnInit {
	inscriptionsForm: FormGroup;
	genders: string[] = ["Hombre", "Mujer", "Otro"];
	activities: Activity[] = [];
	referrers: User[] = []
	fee: number = 0;
	newUser: boolean = true;

	constructor(
		private fb: FormBuilder,
		private usersService: UsersService,
		private activitiesService: ActivitiesService,
		private inscriptionsService: InscriptionsService,
		private router: Router,
	) {
		this.inscriptionsForm = this.fb.group({
			user_id: [null, Validators.required],
			user_name: [null, Validators.required],
			last_name: [null, Validators.required],
			gender: [null, Validators.required],
			birthdate: [null, Validators.required],
			birthplace: [null, Validators.required],
			phone: [null, Validators.required],
			email: [null],
			abilities: [null],
			activity1: [null, Validators.required],
			activity2: [null],
			activity3: [null],
			activity4: [null],
			activity5: [null],
			fee: [null],
			referred: [null, Validators.required]
		});
		this.activitiesService.getActivities().subscribe((data: any) => {
			this.activities = data.activities;
		});
		this.usersService.getUsers().subscribe((data: any) => {
			this.referrers = data.users.filter((user: User) => user.role === 'admin');
		});
	}

	ngOnInit(): void {
		const activity1Changes = this.inscriptionsForm.get('activity1')!.valueChanges;
		const activity2Changes = this.inscriptionsForm.get('activity2')!.valueChanges;
		const activity3Changes = this.inscriptionsForm.get('activity3')!.valueChanges;
		const activity4Changes = this.inscriptionsForm.get('activity4')!.valueChanges;
		const activity5Changes = this.inscriptionsForm.get('activity5')!.valueChanges;

		merge(activity1Changes, activity2Changes, activity3Changes, activity4Changes, activity5Changes)
			.subscribe((value) => {
				if (value === '') {
					this.inscriptionsForm.patchValue({
						activity1: this.inscriptionsForm.get('activity1')!.value === '' ? null : this.inscriptionsForm.get('activity1')!.value,
						activity2: this.inscriptionsForm.get('activity2')!.value === '' ? null : this.inscriptionsForm.get('activity2')!.value,
						activity3: this.inscriptionsForm.get('activity3')!.value === '' ? null : this.inscriptionsForm.get('activity3')!.value,
						activity4: this.inscriptionsForm.get('activity4')!.value === '' ? null : this.inscriptionsForm.get('activity4')!.value,
						activity5: this.inscriptionsForm.get('activity5')!.value === '' ? null : this.inscriptionsForm.get('activity5')!.value
					}, { emitEvent: false });
				}
				this.calculateFee();
			});
	}

	calculateFee(): void {
		this.fee = 0;

		const selectedActivity1 = this.inscriptionsForm.get('activity1')!.value;
		const selectedActivity2 = this.inscriptionsForm.get('activity2')!.value;
		const selectedActivity3 = this.inscriptionsForm.get('activity3')!.value;
		const selectedActivity4 = this.inscriptionsForm.get('activity4')!.value;
		const selectedActivity5 = this.inscriptionsForm.get('activity5')!.value;

		let numberOfSelectedActivities = 0;
		if (selectedActivity1) numberOfSelectedActivities++;
		if (selectedActivity2) numberOfSelectedActivities++;
		if (selectedActivity3) numberOfSelectedActivities++;
		if (selectedActivity4) numberOfSelectedActivities++;
		if (selectedActivity5) numberOfSelectedActivities++;

		this.fee = numberOfSelectedActivities * 5;
	}

	checkUserId(): void {
		const userId = this.inscriptionsForm.get('user_id')!.value;
		if (userId) {
			this.usersService.getUser(userId).pipe(
				catchError((error) => {
					console.error("Error fetching user: ", error);
					return throwError(() => error);
				})
			).subscribe({
				next: (data: any) => {
					if (data.user) {
						this.inscriptionsForm.patchValue({
							user_name: data.user.user_name,
							last_name: data.user.last_name,
							gender: data.user.gender,
							birthdate: data.user.birthdate,
							birthplace: data.user.birthplace,
							phone: data.user.phone,
							email: data.user.email,
							abilities: data.user.abilities
						});
						this.newUser = false;
						alert("Datos de " + userId + " importados correctamente.");
					} else {
						alert("No se encontraron datos de " + userId);
					}
				},
				error: (error) => {
					console.error("There was an error during the user fetch: ", error);
				}
			});
		}
	}

	resetForm(): void {
		this.inscriptionsForm.reset();
	}

	onSubmit(): void {
		const user: User = {
			user_id: this.inscriptionsForm.get('user_id')!.value,
			user_name: this.inscriptionsForm.get('user_name')!.value,
			last_name: this.inscriptionsForm.get('last_name')!.value,
			gender: this.inscriptionsForm.get('gender')!.value,
			birthdate: this.inscriptionsForm.get('birthdate')!.value,
			birthplace: this.inscriptionsForm.get('birthplace')!.value,
			phone: this.inscriptionsForm.get('phone')!.value,
			email: this.inscriptionsForm.get('email')?.value,
			abilities: this.inscriptionsForm.get('abilities')?.value
		};

		if (this.newUser) {
			this.usersService.createUser(user).pipe(
				catchError((error) => {
					console.error("Error creating user: ", error);
					return throwError(() => error);
				})
			).subscribe({
				next: (data: any) => {
					console.log("User created successfully: " + data);
				},
				error: (error) => {
					console.error("There was an error during the user creation: ", error);
				}
			});
		} else {
			this.usersService.updateUser(user.user_id, user).pipe(
				catchError((error) => {
					console.error("Error updating user: ", error);
					return throwError(() => error);
				})
			).subscribe({
				next: (data: any) => {
					console.log("User updated successfully: " + data);
				},
				error: (error) => {
					console.error("There was an error during the user update: ", error);
				}
			});
		}

		const inscription: Inscription = {
			user_id: user.user_id,
			activity1_id: this.inscriptionsForm.get('activity1')!.value,
			activity2_id: this.inscriptionsForm.get('activity2')?.value,
			activity3_id: this.inscriptionsForm.get('activity3')?.value,
			activity4_id: this.inscriptionsForm.get('activity4')?.value,
			activity5_id: this.inscriptionsForm.get('activity5')?.value,
			fee: this.fee,
			referred: this.inscriptionsForm.get('referred')!.value
		};

		this.inscriptionsService.createInscription(inscription).pipe(
			catchError((error) => {
				console.error("Error creating inscription: ", error);
				return throwError(() => error);
			})
		).subscribe({
			next: (data: any) => {
				console.log("Inscription created successfully: " + data);
			},
			error: (error) => {
				console.error("There was an error during the inscription creation: ", error);
			}
		});
		this.inscriptionsForm.reset();
	}
}
