import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@models/user.model';
import { UsersService } from '@services/users.service';

@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [CommonModule, FormsModule,
		//DateFormatterPipe, VmDialogComponent
	],
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
	users: User[] = [];
	filteredUsers: User[] = [];
	selectedUserId: string = '';

	constructor(
		private usersService: UsersService,
		private router: Router,
		// private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.usersService.getUsers().subscribe((data: any) => {
			this.users = data;
			this.filteredUsers = data;
		});
	}

	filterUsers(): void {
		if (this.selectedUserId) {
			this.filteredUsers = this.users.filter(
				user => user.user_id.includes(this.selectedUserId)
			);
		} else {
			this.filteredUsers = this.users;
		}
	}

	addNewUser(): void {
		this.router.navigate(['users/register']);
	}


	openDialog(vmId: number): void {
		// this.dialog.open(VmDialogComponent, {
		// 	data: vmId
		// });
		// this.dialog.afterAllClosed.subscribe(() => {
		// 	this.vmService.getVms().subscribe(data => {
		// 		this.vms = data;
		// 		this.filteredVms = data;
		// 	});
		// });
	}
}
