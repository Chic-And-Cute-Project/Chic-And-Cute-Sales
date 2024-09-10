import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseService} from "../../../shared/services/base/base.service";
import {RemissionGuide} from "../../models/remissionGuide";
import {catchError, Observable} from "rxjs";
import {RemissionGuideApiResponse} from "../../models/apiResponses/remissionGuideApiResponse";

@Injectable({
  providedIn: 'root'
})
export class RemissionGuideService extends BaseService<RemissionGuideApiResponse>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'remission-guides';
    }

    create(item: RemissionGuide): Observable<RemissionGuideApiResponse> {
        return this.http.post<RemissionGuideApiResponse>(this.basePath, JSON.stringify(item), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        })
            .pipe(catchError(this.handleError));
    }

    updateState(remissionGuideId: string): Observable<RemissionGuideApiResponse> {
        return this.http.put<RemissionGuideApiResponse>(`${this.basePath}?idRemissionGuide=${remissionGuideId}`, { status: "Aceptado" }, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        })
            .pipe(catchError(this.handleError));
    }

    getAllByMySede(): Observable<RemissionGuideApiResponse> {
        return this.http.get<RemissionGuideApiResponse>(`${this.basePath}/mySede`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }
}
