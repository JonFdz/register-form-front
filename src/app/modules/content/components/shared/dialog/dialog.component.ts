import { Component, Inject, input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UsersDetailsComponent } from '@users/users-details/users-details.component';
import { ActivitiesDetailsComponent } from '@activities/activities-details/activities-details.component';
import { StatusMessageComponent } from '@sharedcontent/status-message/status-message.component';

export enum DialogType {
	Users = 'Users',
	Activities = 'Activities',
	Status = 'Status'
}

@Component({
	selector: 'app-dialog',
	standalone: true,
	imports: [ UsersDetailsComponent, ActivitiesDetailsComponent, StatusMessageComponent],
	templateUrl: './dialog.component.html',
	styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
	id: string = '';
	contentToShow = '';
	dialogType = DialogType;
	status: 'success' | 'error' = 'success';
	message = '';

	constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private data: { component?: string, id?: string, status?: 'success' | 'error', message?: string }) { }

	ngOnInit(): void {
		this.id = this.data.id ? this.data.id : '';
		this.contentToShow = this.data.component ? this.data.component : '';
		this.status = this.data.status ? this.data.status : 'success';
		this.message = this.data.message ? this.data.message : '';
	}

	closeDialog(): void {
		this.dialogRef.close();
	}

}
