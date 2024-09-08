import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '@services/users.service';

@Component({
	selector: 'app-users-form',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './users-form.component.html',
	styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnInit {
	usersForm: FormGroup;
	genders: string[] = ["Hombre", "Mujer", "Otro"];
	roles: string[] = ["Xarxero", "Acogida", "Administrador"];
	userId: string | null = null;

	constructor(
		private fb: FormBuilder,
		private usersService: UsersService,
		private router: Router,
		private route: ActivatedRoute
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

	onSubmit(): void {
		if (this.usersForm.valid) {
			if (this.userId) {
				this.usersService.updateUser(this.userId, this.usersForm.value).subscribe(() => {
					alert('Usuario actualizado correctamente');
					console.log('User updated');
					this.router.navigate(['users/']);
				});
			} else {
				this.usersService.createUser(this.usersForm.value).subscribe(() => {
					alert('Usuario creado correctamente');
					console.log('User created');
					this.usersForm.reset();
					this.router.navigate(['users/']);
				});
			}
		} else {
			alert('Formulario no válido');
			console.log('Invalid form');
		}
	}
}
