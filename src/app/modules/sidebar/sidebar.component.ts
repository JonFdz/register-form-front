import { Component, input, InputSignal, output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
	public sidebarOpen: InputSignal<boolean> = input(false);
	public onCloseSidebar = output();

	constructor(private authService: AuthService, private router: Router) { }

	isLoggedIn(): boolean {
		return this.authService.isLoggedIn();
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}

	closeSidebar(): void {
		this.onCloseSidebar.emit();
	}
}
