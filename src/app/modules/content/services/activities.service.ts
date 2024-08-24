import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '@models/activity.model';

@Injectable({
	providedIn: 'root'
})
export class ActivitysService {
	private apiUrl = 'http://localhost:3000/api/activities/';

	constructor(private http: HttpClient) { }

	getActivitys(): Observable<Activity[]> {
		return this.http.get<Activity[]>(this.apiUrl);
	}

	getActivity(id: number): Observable<Activity> {
		return this.http.get<Activity>(`${this.apiUrl}/${id}`);
	}

	createActivity(activity: Activity): Observable<Activity> {
		return this.http.post<Activity>(this.apiUrl, activity);
	}

	updateActivity(id: number, activity: Activity): Observable<Activity> {
		return this.http.put<Activity>(`${this.apiUrl}/${id}`, activity);
	}

	deleteActivity(id: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
