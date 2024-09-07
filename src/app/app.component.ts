import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from "./modules/footer/footer.component";
import { SidebarComponent } from './modules/sidebar/sidebar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'register-form';

	sidebarOpen: boolean = false;

	toggleSidebar(): void {
		this.sidebarOpen = !this.sidebarOpen;
	}
}
