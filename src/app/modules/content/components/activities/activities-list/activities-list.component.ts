import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ActivitiesService } from '@services/activities.service';
import { Activity } from '@models/activity.model';
import { Router } from '@angular/router';
import { DialogComponent } from '@sharedcontent/dialog/dialog.component';

@Component({
	selector: 'app-activities-list',
	templateUrl: './activities-list.component.html',
	styleUrls: ['./activities-list.component.scss'],
	standalone: true,
	imports: [CommonModule, FormsModule,]
})
export class ActivitiesListComponent implements OnInit {
	activities: Activity[] = [];
	filteredActivities: Activity[] = [];
	selectedDays: string[] = [];
	selectedCategories: string[] = [];

	constructor(
		private activitiesService: ActivitiesService,
		private router: Router,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.activitiesService.getActivities().subscribe((data: any) => {
			this.activities = data;
			this.filteredActivities = data;
		});
	}

	filterActivities(): void {
		this.filteredActivities = this.activities;

		if (this.selectedDays) {
			this.filteredActivities = this.filteredActivities.filter(activity =>
				this.selectedDays.some(day => activity.day.includes(day))
			);
		}

		if (this.selectedCategories) {
			this.filteredActivities = this.filteredActivities.filter(activity =>
				this.selectedCategories.some(category => activity.category?.includes(category))
			);
		}
	}

	addNewActivity(): void {
		this.router.navigate(['activities/register']);
	}


	openDialog(component: string, id: number): void {
		this.dialog.open(DialogComponent, {
			data: {component, id }
		});
		this.dialog.afterAllClosed.subscribe(() => {
			this.activitiesService.getActivities().subscribe(data => {
				this.activities = data;
				this.filteredActivities = data;
			});
		});
	}
}
