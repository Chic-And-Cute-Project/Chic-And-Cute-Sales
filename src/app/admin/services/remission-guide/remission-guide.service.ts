import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseService} from "../../../shared/services/base/base.service";
import {RemissionGuide} from "../../models/remissionGuide";
import {catchError, Observable} from "rxjs";
import {RemissionGuideApiResponse} from "../../models/apiResponses/remissionGuideApiResponse";

@Injectable({
  providedIn: 'root'
})
export class RemissionGuideService extends BaseService<RemissionGuide>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'remission-guides';
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        };
    }

    create(item: RemissionGuide): Observable<RemissionGuideApiResponse> {
        return this.http.post<RemissionGuideApiResponse>(this.basePath, JSON.stringify(item), this.httpOptions)
            .pipe(catchError(this.handleError));
    }
}
