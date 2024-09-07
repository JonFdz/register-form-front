// auth.service.ts - Servicio de autenticación en Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl = 'https://xicnoubarris.org/wp-json/jwt-auth/v1/token';
	public returnUrl: string = '';

	constructor(private http: HttpClient) { }

	login(username: string, password: string) {
		return this.http.post(this.apiUrl, {
			username,
			password,
		});
	}

	isLoggedIn(): boolean {
		// Lógica para verificar si el token está presente y válido
		const token = localStorage.getItem('token');
		return token != null;
	}

	logout() {
		localStorage.removeItem('token');
	}
}
