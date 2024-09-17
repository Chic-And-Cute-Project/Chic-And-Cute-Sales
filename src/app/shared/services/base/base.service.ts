import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BaseService<T> {
    basePath: string = 'https://www.amoamel.com/chic/api/';

    constructor(public http: HttpClient) {}

    handleError(error: HttpErrorResponse): Observable<never> {
        return throwError(() => new Error(error.error.message));
    }

    getObject(): Observable<T> {
        return this.http.get<T>(`${this.basePath}/myObject`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    getAll(): Observable<T> {
        return this.http.get<T>(`${this.basePath}/list`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }
}
