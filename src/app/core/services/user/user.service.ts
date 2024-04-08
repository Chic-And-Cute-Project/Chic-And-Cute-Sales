import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {UserApiResponse} from "../../../security/models/apiResponses/userApiResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {User} from "../../../security/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserApiResponse>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'users';
    }

    getAll(): Observable<UserApiResponse> {
        return this.http.get<UserApiResponse>(`${this.basePath}/getAllSales`, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    create(user: User): Observable<UserApiResponse> {
        return this.http.post<UserApiResponse>(`${this.basePath}/register`, JSON.stringify(user), this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    update(user: User): Observable<UserApiResponse> {
        return this.http.put<UserApiResponse>(`${this.basePath}?idUser=${user._id}`, user, this.httpOptions)
            .pipe(catchError(this.handleError));
    }
}
