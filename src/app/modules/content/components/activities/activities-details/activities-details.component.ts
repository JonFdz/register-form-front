import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesService } from '@services/activities.service';
import { Activity } from '@models/activity.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@sharedcontent/dialog/dialog.component';


@Component({
	selector: 'app-activities-details',
	templateUrl: './activities-details.component.html',
	styleUrls: ['./activities-details.component.scss'],
	standalone: true,
	imports: [CommonModule]
})
export class ActivitiesDetailsComponent implements OnInit {
	activity: Activity = {} as Activity;
	activityId = input.required<number>();
	closeDialog = output<void>();

	constructor(
		private activitiesService: ActivitiesService,
		private router: Router,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		if (this.activityId()) {
			this.activitiesService.getActivity(this.activityId()).subscribe(data => {
				this.activity = data;
			});
		}
	}

	onCloseDialog(): void {
		this.closeDialog.emit();
	}

	deleteActivity(): void {
		const dialogRef = this.dialog.open(DialogComponent, {
			data: {
				component: 'Confirm',
				message: `Estàs segur que vols eliminar l'intercanvi ${this.activity.activity_name}?`
			},
			disableClose: true, // Esto deshabilita el cierre del diálogo al hacer clic fuera de él
			hasBackdrop: true   // Esto asegura que haya un fondo detrás del diálogo
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.activitiesService.deleteActivity(this.activity.activity_id!).subscribe(() => {
					this.onCloseDialog();
				});
			}
		});
	}

	updateActivity(): void {
		this.router.navigate(['/activities/register', this.activity.activity_id]);
		this.closeDialog.emit();
	}
}
