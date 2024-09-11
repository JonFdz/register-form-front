import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent } from '@sharedcontent/dialog/dialog.component';
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
		private dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.returnUrl = this.authService.returnUrl || '/';
	}

	openDialog(component: string, status: 'success' | 'error', message: string): void {
		this.dialog.open(DialogComponent, {
			data: {component, status, message }
		});
		this.dialog.afterAllClosed.subscribe(() => {
			window.scrollTo(0, 0);
		});
	}

	onSubmit(): void {
		this.authService.login(this.username, this.password).subscribe({
			next: (response: any) => {
				if (response.token) {

					localStorage.setItem('token', response.token);
					this.router.navigateByUrl(this.returnUrl).then(() => {
						this.returnUrl = '';
						window.scrollTo(0, 0);
					});
				} else {
					this.openDialog('Status', 'error', 'Login failed');
				}
			},
			error: () => {
				this.openDialog('Status', 'error', 'Login failed');
			}
		});
	}
}
