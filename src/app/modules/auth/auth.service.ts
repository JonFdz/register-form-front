import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

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
        const token = localStorage.getItem('token');
        return token != null && !this.isTokenExpired();
    }

    isTokenExpired(): boolean {
        const expiration = localStorage.getItem('tokenExpiration');
        if (!expiration) {
            return true;
        }
        return new Date() > new Date(expiration);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
    }
}