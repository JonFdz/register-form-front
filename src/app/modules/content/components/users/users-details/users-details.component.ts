import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '@services/users.service';
import { User } from '@models/user.model';
import { Router } from '@angular/router';


@Component({
	selector: 'app-users-details',
	templateUrl: './users-details.component.html',
	styleUrls: ['./users-details.component.scss'],
	standalone: true,
	imports: [CommonModule]
})
export class UsersDetailsComponent implements OnInit {
	user: User = {} as User;
	userId = input.required<string>();
	closeDialog = output<void>();

	constructor(
		private usersService: UsersService,
		private router: Router
	) { }

	ngOnInit(): void {
		if (this.userId()) {
			this.usersService.getUser(this.userId()).subscribe(data => {
				this.user = data;
			});
		}
	}

	onCloseDialog(): void {
		this.closeDialog.emit();
	}

	deleteUser(): void {
		if (confirm(`¿Estás seguro de que quieres eliminar el usuario ${this.user.user_id}?`)) {
			this.usersService.deleteUser(this.userId()!).subscribe(() => {
				this.closeDialog.emit();
			});
		};
	}

	updateUser(): void {
		this.router.navigate(['/users/register', this.user.user_id]);
		this.closeDialog.emit();
	}
}
