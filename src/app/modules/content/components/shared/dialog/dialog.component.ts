import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UsersDetailsComponent } from '@users/users-details/users-details.component';
import { ActivitiesDetailsComponent } from '@activities/activities-details/activities-details.component';

export enum DialogType {
	Users = 'Users',
	Activities = 'Activities',
}

@Component({
	selector: 'app-dialog',
	standalone: true,
	imports: [ UsersDetailsComponent, ActivitiesDetailsComponent],
	templateUrl: './dialog.component.html',
	styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
	id: string = '';
	contentToShow = '';
	dialogType = DialogType;

	constructor(private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private data: { component: string, id: string }) { }

	ngOnInit(): void {
		this.id = this.data.id;
		this.contentToShow = this.data.component;
	}

	closeDialog(): void {
		this.dialogRef.close();
	}

}
