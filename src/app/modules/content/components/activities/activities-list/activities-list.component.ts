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
	selectedDay: string = '';
	selectedCategory: string = '';

	constructor(
		private activitiesService: ActivitiesService,
		private router: Router,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.activitiesService.getActivities().subscribe((data: any) => {
			this.activities = data.sort((a: Activity, b: Activity) => a.activity_name.localeCompare(b.activity_name));
			this.filteredActivities = data.sort((a: Activity, b: Activity) => a.activity_name.localeCompare(b.activity_name));
		});
	}

	filterActivities(): void {
		this.filteredActivities = this.activities;

		if (this.selectedDay) {
			this.filteredActivities = this.filteredActivities.filter((activity) => activity.day === this.selectedDay);
		}

		if (this.selectedCategory) {
			this.filteredActivities = this.filteredActivities.filter((activity) => activity.category === this.selectedCategory);
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
