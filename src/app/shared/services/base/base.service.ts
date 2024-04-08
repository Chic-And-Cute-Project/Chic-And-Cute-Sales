import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {UserApiResponse} from "../../../security/models/apiResponses/userApiResponse";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
    basePath: string = 'http://localhost:3000/api/';

    httpOptions: { headers: HttpHeaders } = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        })
    };

    constructor(public http: HttpClient) {}

    handleError(error: HttpErrorResponse): Observable<never> {
        return throwError(() => new Error(error.error.message));
    }

    getObject(): Observable<T> {
        return this.http.get<T>(`${this.basePath}/myObject`, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
}
