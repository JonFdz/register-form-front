import { Component, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	public onToggleSidebar = output();

	constructor(private authService: AuthService, private router: Router) { }

	isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}

	handleAuthAction(): void {
		if (this.isLoggedIn()) {
			this.authService.logout();
			this.router.navigate(['/login']);
		} else {
			this.router.navigate(['/login']);
		}
	}

	toggleSidebar(): void {
		this.onToggleSidebar.emit();
	}
}
