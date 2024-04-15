import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {}

    login(token: string) {
        localStorage.setItem('token', token);
    }

    logout() {
        localStorage.clear();
    }

    checkLogin(): boolean {
        return localStorage.getItem('token') != null;
    }
}
