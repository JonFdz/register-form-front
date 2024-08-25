import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@models/user.model';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	private apiUrl = 'http://localhost:3000/api/users/';  // Cambia esto por la URL de tu backend

	constructor(private http: HttpClient) { }

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.apiUrl);
	}

	getUser(id: string): Observable<User> {
		return this.http.get<User>(`${this.apiUrl}/${id}`);
	}

	createUser(user: User): Observable<User> {
		return this.http.post<User>(this.apiUrl, user);
	}

	updateUser(id: string, user: User): Observable<User> {
		return this.http.put<User>(`${this.apiUrl}/${id}`, user);
	}

	deleteUser(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
