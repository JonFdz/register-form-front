import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';

import { ActivitiesService } from '@services/activities.service';
import { Activity } from '@models/activity.model';
import { Router } from '@angular/router';
// import { VmDialogComponent } from '@vm/components/vm-dialog/vm-dialog.component';

// import { DateFormatterPipe } from '@shared/pipes/date-formatter.pipe';

@Component({
	selector: 'app-activities-list',
	templateUrl: './activities-list.component.html',
	styleUrls: ['./activities-list.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule,
		//DateFormatterPipe, VmDialogComponent
	]
})
export class ActivitiesListComponent implements OnInit {
	activities: Activity[] = [];
	filteredActivities: Activity[] = [];
	selectedDay: string = '';

	constructor(
		private activitiesService: ActivitiesService,
		private router: Router,
		// private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.activitiesService.getActivities().subscribe((data: any) => {
			this.activities = data.activities;
			this.filteredActivities = data.activities;
		});
	}

	filterActivities(): void {
		if (this.selectedDay) {
			this.filteredActivities = this.activities.filter(
				activity => activity.day === this.selectedDay
			);
		} else {
			this.filteredActivities = this.activities;
		}
	}

	addNewActivity(): void {
		this.router.navigate(['activities/register']);
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
