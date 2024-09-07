import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/modules/auth/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	username: string = '';
	password: string = '';
	returnUrl: string = '';

	constructor(
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.returnUrl = this.authService.returnUrl || '/';
	}

	onSubmit(): void {
		this.authService.login(this.username, this.password).subscribe({
			next: (response: any) => {
				if (response.token) {

					localStorage.setItem('token', response.token);
					this.router.navigateByUrl(this.returnUrl).then(() => {
						this.returnUrl = '';
					});
				} else {
					alert('Login failed');
				}
			},
			error: () => {
				alert('Login failed');
			}
		});
	}
}
