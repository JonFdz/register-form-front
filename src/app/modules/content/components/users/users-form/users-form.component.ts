import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@services/users.service';

@Component({
	selector: 'app-users-form',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './users-form.component.html',
	styleUrl: './users-form.component.scss'
})
export class UsersFormComponent {
	usersForm: FormGroup;
	genders: string[] = ["Hombre", "Mujer", "Otro"];
	roles: string[] = ["Xarxero", "Acogida", "Administrador"];

	constructor(
		private fb: FormBuilder,
		private usersService: UsersService,
		private router: Router
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

	onSubmit(): void {
		if (this.usersForm.valid) {
			this.usersService.createUser(this.usersForm.value).subscribe((data: any) => {
				alert('Usuario creado correctamente');
				console.log('Usuario creado');
				this.usersForm.reset();
				this.router.navigate(['users/']);
			});
		} else {
			alert('Formulario no válido');
			console.log('Formulario no válido');
		}
	}
}
