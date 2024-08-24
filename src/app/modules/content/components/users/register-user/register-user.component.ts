import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterFormService } from '../../../services/register-user.service';


@Component({
	selector: 'app-register-user',
	templateUrl: './register-user.component.html',
	styleUrls: ['./register-user.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterUserComponent {
	vmForm: FormGroup;
	genders: string[] = ["Hombre", "Mujer", "Otro"];

	constructor(
		private fb: FormBuilder,
		private registerFormService: RegisterFormService,
		private router: Router
	) {
		this.vmForm = this.fb.group({
			vmName: [null, Validators.required],
			ip: [null, Validators.required],
			dnsName: [null, Validators.required],
			project: [null],
			environment: [null],
			status: [null, Validators.required],
			comment: [null],
			operatingSystem: [null],
			cpuCores: [null],
			gpu: [null],
			ram: [null],
			disk: [null]
		});
	}

	onSubmit(): void {
		this.vmForm.value.createdAt = new Date();
		this.vmForm.value.updatedAt = new Date();
		
	}
}
