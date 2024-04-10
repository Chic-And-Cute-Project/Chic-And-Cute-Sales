import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../../shared/services/base/base.service";
import {catchError, Observable} from "rxjs";
import {UserApiResponse} from "../../models/apiResponses/userApiResponse";

@Injectable({
    providedIn: 'root'
})
export class LogInService extends BaseService<UserApiResponse>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'users/login';
    }

    logIn(item: { username: string, password: string }): Observable<UserApiResponse> {
        return this.http.post<UserApiResponse>(this.basePath, JSON.stringify(item), this.httpOptions)
            .pipe(catchError(this.handleError));
    }
}
