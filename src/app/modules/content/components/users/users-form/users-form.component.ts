import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '@services/users.service';
import { DialogComponent } from '@sharedcontent/dialog/dialog.component';

@Component({
	selector: 'app-users-form',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './users-form.component.html',
	styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnInit {
	usersForm: FormGroup;
	genders: string[] = ["Home", "Dona", "Altres"];
	roles: string[] = ["Xarxero", "Acollida"];
	userId: string | null = null;

	constructor(
		private fb: FormBuilder,
		private usersService: UsersService,
		private router: Router,
		private route: ActivatedRoute,
		private dialog: MatDialog,
	) {
		this.usersForm = this.fb.group({
			user_id: ['', Validators.required],
			user_name: ['', Validators.required],
			last_name: ['', Validators.required],
			gender: ['', Validators.required],
			birthdate: ['', Validators.required],
			birthplace: ['', Validators.required],
			phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
			email: [''],
			abilities: [''],
			role: ['']
		});
	}

	ngOnInit(): void {
		this.userId = this.route.snapshot.paramMap.get('id');
		if (this.userId) {
			this.loadUserData(this.userId);
		}
	}

	loadUserData(userId: string): void {
		this.usersService.getUser(userId).subscribe((user: any) => {
			this.usersForm.patchValue(user);
		});
	}

	resetForm(): void {
		this.usersForm.reset();
	}

	openDialog(component: string, status: 'success' | 'error', message: string): void {
		this.dialog.open(DialogComponent, {
			data: { component, status, message }
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
		if (this.usersForm.invalid) {
			this.highlightInvalidFields(this.usersForm);
			this.openDialog('Status', 'error', 'Revisa els camps marcats en vermell.');
		} else {
			if (this.userId) {
				this.usersService.updateUser(this.userId, this.usersForm.value).subscribe(() => {
					this.openDialog('Status', 'success', 'Usuari actualitzat correctament');
					console.log('User updated');
				});
			} else {
				this.usersService.createUser(this.usersForm.value).subscribe(() => {
					this.openDialog('Status', 'success', 'Usuari creat correctament');
					console.log('User created');
				});
			}
			this.router.navigate(['users/']);
		}
	}
}
