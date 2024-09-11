import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesService } from '@services/activities.service';
import { Activity } from '@models/activity.model';
import { Router } from '@angular/router';


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
		private usersService: ActivitiesService,
		private router: Router
	) { }

	ngOnInit(): void {
		if (this.activityId()) {
			this.usersService.getActivity(this.activityId()).subscribe(data => {
				this.activity = data;
			});
		}
	}

	onCloseDialog(): void {
		this.closeDialog.emit();
	}

	deleteActivity(): void {
		if (confirm(`Estàs segur que vols eliminar l'intercanvi ${this.activity.activity_name}?`)) {
			this.usersService.deleteActivity(this.activityId()!).subscribe(() => {
				this.closeDialog.emit();
			});
		};
	}

	updateActivity(): void {
		this.router.navigate(['/activities/register', this.activity.activity_id]);
		this.closeDialog.emit();
	}
}
