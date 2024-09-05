import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsService } from '@services/inscriptions.service';
import { ActivitiesService } from '@services/activities.service';
import { UsersService } from '@services/users.service';
import { FormsModule } from '@angular/forms';

import { Activity } from '@models/activity.model';
import { Inscription } from '@models/inscription.model';
import { User } from '@models/user.model';

@Component({
	selector: 'app-export',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './export.component.html',
	styleUrl: './export.component.scss'
})
export class ExportComponent {
	exportType: string = 'inscriptions';
	startDate: string = '';
	endDate: string = '';

	constructor(
		private inscriptionsService: InscriptionsService,
		private activitiesService: ActivitiesService,
		private usersService: UsersService
	) { }

	exportFile(): void {
		switch (this.exportType) {
			case 'inscriptions':
				this.exportInscriptions();
				break;
			case 'activities':
				this.exportActivities();
				break;
			case 'users':
				this.exportUsers();
				break;
		}
	}

	private exportInscriptions(): void {
		this.inscriptionsService.getInscriptions().subscribe((data: any) => {
			const filteredData = this.filterByDate(data);
			const sortedData = filteredData.sort((a: Inscription, b: Inscription) => a.inscription_id! - b.inscription_id!);
			this.downloadCSV(sortedData, 'inscriptions.csv');
		});
	}

	private exportActivities(): void {
		this.activitiesService.getActivities().subscribe((data: any) => {
			this.downloadCSV(data, 'activities.csv');
		});
	}

	private exportUsers(): void {
		this.usersService.getUsers().subscribe((data: any) => {
			this.downloadCSV(data, 'users.csv');
		});
	}

	private filterByDate(data: Inscription[]): Inscription[] {
		if (!this.startDate && !this.endDate) {
			return data;
		}
		const start = new Date(this.startDate);
		const end = new Date(this.endDate);;
		return data.filter((inscription: Inscription) => {
			const date = new Date(inscription.created_at ?? '');
			return date >= start && date <= end;
		});
	}

	private downloadCSV(data: any[], filename: string): void {
		const csvData = this.convertToCSV(data);
		const blob = new Blob([csvData], { type: 'text/csv' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.setAttribute('hidden', '');
		a.setAttribute('href', url);
		a.setAttribute('download', filename);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	private convertToCSV(objArray: any[]): string {
		const array = [Object.keys(objArray[0])].concat(objArray);
		return array.map(it => {
			return Object.values(it).toString();
		}).join('\n');
	}
}