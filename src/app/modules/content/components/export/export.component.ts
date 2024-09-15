import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InscriptionsService } from '@services/inscriptions.service';
import { ActivitiesService } from '@services/activities.service';
import { UsersService } from '@services/users.service';
import { FormsModule } from '@angular/forms';

import { Inscription } from '@models/inscription.model';
import { Activity } from '@models/activity.model';
import { User } from '@models/user.model';

@Component({
	selector: 'app-export',
	standalone: true,
	imports: [CommonModule, FormsModule],
	providers: [DatePipe],
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
		private usersService: UsersService,
		private datePipe: DatePipe
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
		this.inscriptionsService.getInscriptions().subscribe((data: Inscription[]) => {
			const filteredData = this.filterByDate(data);
			const sortedData = filteredData.sort((a: Inscription, b: Inscription) => a.inscription_id! - b.inscription_id!);
			const transformedData = this.transformInscriptions(sortedData);
			this.downloadCSV(transformedData, 'inscripcions.csv');
		});
	}

	private exportActivities(): void {
		this.activitiesService.getActivities().subscribe((data: Activity[]) => {
			const sortedData = data.sort((a: Activity, b: Activity) => a.activity_name.localeCompare(b.activity_name));
			const transformedData = this.transformActivities(sortedData);
			this.downloadCSV(transformedData, 'intercanvis.csv');
		});
	}

	private exportUsers(): void {
		this.usersService.getUsers().subscribe((data: User[]) => {
			const sortedData = data.sort((a: User, b: User) => a.user_id.localeCompare(b.user_id));
			const transformedData = this.transformUsers(sortedData);
			this.downloadCSV(transformedData, 'usuaris.csv');
		});
	}

	private filterByDate(data: Inscription[]): Inscription[] {
		if (!this.startDate && !this.endDate) {
			return data;
		}
		const start = new Date(this.startDate);
		start.setHours(0, 0, 0, 0);

		const end = new Date(this.endDate);
		end.setHours(23, 59, 59, 999);

		return data.filter((inscription: Inscription) => {
			const date = new Date(inscription.created_at ?? '');
			return date >= start && date <= end;
		});
	}

	private transformInscriptions(data: Inscription[]): any[] {
		return data.map(inscription => ({
			DATA: this.datePipe.transform(inscription.created_at, 'dd/MM/yyyy HH:mm:ss'),
			'DNI/NIE': inscription.user_id,
			NOM: inscription.user_name,
			COGNOMS: inscription.last_name,
			GENERE: inscription.gender,
			'DATA DE NAIXEMENT': this.datePipe.transform(inscription.birthdate, 'dd/MM/yyyy'),
			'LLOC DE NAIXEMENT': inscription.birthplace,
			TELEFON: inscription.phone,
			'CORREU ELECTRONIC': inscription.email,
			'INTERCANVI 1': `${inscription.activity1_name} | ${inscription.activity1_instructor}`,
			'HORARI 1': `${inscription.activity1_day} de ${inscription.activity1_hour}`,
			'INTERCANVI 2': inscription.activity2_name ? `${inscription.activity2_name} | ${inscription.activity2_instructor}` : '',
			'HORARI 2': inscription.activity2_day ? `${inscription.activity2_day} de ${inscription.activity2_hour}` : '',
			'INTERCANVI 3': inscription.activity3_name ? `${inscription.activity3_name} | ${inscription.activity3_instructor}` : '',
			'HORARI 3': inscription.activity3_day ? `${inscription.activity3_day} de ${inscription.activity3_hour}` : '',
			HABILITATS: inscription.abilities,
			INTERCANVIS: inscription.activities_selected,
			QUOTA: `${inscription.fee}€`,
			ACOLLIDA: inscription.referred
		}));
	}

	private transformActivities(data: Activity[]): any[] {
		return data.map(activity => ({
			NOM: activity.activity_name,
			'FACILITADOR/A': activity.instructor,
			DIA: activity.day,
			HORA: activity.hour,
			CATEGORIA: activity.category,
			DESCRIPCIO: activity.description
		}));
	}

	private transformUsers(data: User[]): any[] {
		return data.map(user => ({
			'DNI/NIE': user.user_id,
			NOM: user.user_name,
			COGNOMS: user.last_name,
			GENERE: user.gender,
			'DATA DE NAIXEMENT': this.datePipe.transform(user.birthdate, 'dd/MM/yyyy'),
			'LLOC DE NAIXEMENT': user.birthplace,
			TELEFON: user.phone,
			'CORREU ELECTRONIC': user.email,
			HABILITATS: user.abilities,
			ROL: user.role
		}));
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