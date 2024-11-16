import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {CloseSalesDayApiResponse} from "../../models/apiResponses/closeSalesDayApiResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {CloseSalesDay} from "../../models/close-sales-day";

@Injectable({
  providedIn: 'root'
})
export class CloseSalesDayService extends BaseService<CloseSalesDayApiResponse>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'close-sales-day';
    }

    createSales(item: CloseSalesDay): Observable<CloseSalesDayApiResponse> {
        return this.http.post<CloseSalesDayApiResponse>(`${this.basePath}/sales`, JSON.stringify(item), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    createAdmin(item: CloseSalesDay): Observable<CloseSalesDayApiResponse> {
        return this.http.post<CloseSalesDayApiResponse>(`${this.basePath}/admin`, JSON.stringify(item), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    getByMySede(minDate: Date, maxDate: Date): Observable<CloseSalesDayApiResponse> {
        return this.http.get<CloseSalesDayApiResponse>(`${this.basePath}/mySede?minDate=${minDate.toISOString()}&maxDate=${maxDate.toISOString()}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    getBySede(sede: string, minDate: Date, maxDate: Date): Observable<CloseSalesDayApiResponse> {
        return this.http.get<CloseSalesDayApiResponse>(`${this.basePath}/sede?sede=${sede}&minDate=${minDate.toISOString()}&maxDate=${maxDate.toISOString()}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }
}
