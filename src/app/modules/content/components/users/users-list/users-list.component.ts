import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import the MatDialog class

import { User } from '@models/user.model';
import { UsersService } from '@services/users.service';
import { DialogComponent } from '@sharedcontent/dialog/dialog.component';

@Component({
	selector: 'app-users-list',
	standalone: true,
	imports: [CommonModule, FormsModule,],
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
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.usersService.getUsers().subscribe((data: any) => {
			this.users = data.sort((a: User, b: User) => a.user_id.localeCompare(b.user_id));
			this.filteredUsers = data.sort((a: User, b: User) => a.user_id.localeCompare(b.user_id));
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


	openDialog(component: string, id: string): void {
		this.dialog.open(DialogComponent, {
			data: {component, id }
		});
		this.dialog.afterAllClosed.subscribe(() => {
			this.usersService.getUsers().subscribe(data => {
				this.users = data;
				this.filteredUsers = data;
			});
		});
	}
}
