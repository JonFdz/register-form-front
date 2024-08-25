import { Component } from '@angular/core';

import { InscriptionsService } from '@services/inscriptions.service';

@Component({
	selector: 'app-export',
	standalone: true,
	imports: [],
	templateUrl: './export.component.html',
	styleUrl: './export.component.scss'
})
export class ExportComponent {

	constructor(
		private inscriptionsService: InscriptionsService
	) { }

	exportFile(): void {
		this.inscriptionsService.getInscriptions().subscribe((data: any) => {
			const csvData = this.convertToCSV(data.inscriptions);
			const blob = new Blob([csvData], { type: 'text/csv' });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.setAttribute('hidden', '');
			a.setAttribute('href', url);
			a.setAttribute('download', 'export.csv');
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		});
	}

	private convertToCSV(objArray: any[]): string {
		const array = [Object.keys(objArray[0])].concat(objArray);

		return array.map(it => {
			return Object.values(it).toString();
		}).join('\n');
	}
}
