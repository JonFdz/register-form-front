import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscription } from '@models/inscription.model';
import { environment } from 'environments/environment';

@Injectable({
	providedIn: 'root'
})
export class InscriptionsService {
	private apiUrl = environment.apiUrlInscriptions as string;

	constructor(private http: HttpClient) { }

	getInscriptions(): Observable<Inscription[]> {
		return this.http.get<Inscription[]>(this.apiUrl);
	}

	getInscription(id: number): Observable<Inscription> {
		return this.http.get<Inscription>(`${this.apiUrl}/${id}`);
	}

	createInscription(inscription: Inscription): Observable<Inscription> {
		return this.http.post<Inscription>(this.apiUrl, inscription);
	}

	updateInscription(id: number, inscription: Inscription): Observable<Inscription> {
		return this.http.put<Inscription>(`${this.apiUrl}/${id}`, inscription);
	}

	deleteInscription(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
