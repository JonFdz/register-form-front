import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersService } from '@services/users.service';
import { User } from '@models/user.model';
import { Router } from '@angular/router';
import { DialogComponent } from '@sharedcontent/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


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
		private router: Router,
		private dialog: MatDialog
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
		const dialogRef = this.dialog.open(DialogComponent, {
			data: {
				component: 'Confirm',
				message: `Estàs segur que vols eliminar l'usuari ${this.user.user_id}?`
			},
			disableClose: true,
			hasBackdrop: true
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.usersService.deleteUser(this.user.user_id!).subscribe(() => {
					this.onCloseDialog();
				});
			}
		});
	}

	updateUser(): void {
		this.router.navigate(['/users/register', this.user.user_id]);
		this.closeDialog.emit();
	}
}
