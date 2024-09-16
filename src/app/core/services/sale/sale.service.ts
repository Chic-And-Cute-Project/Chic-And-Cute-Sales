import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {SaleApiResponse} from "../../models/apiResponses/saleApiResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Sale} from "../../models/sale";

@Injectable({
  providedIn: 'root'
})
export class SaleService extends BaseService<SaleApiResponse>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'sales';
    }

    create(item: Sale): Observable<SaleApiResponse> {
        return this.http.post<SaleApiResponse>(this.basePath, JSON.stringify(item), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    getByMyInfo(minDate: Date, maxDate: Date): Observable<SaleApiResponse> {
        return this.http.get<SaleApiResponse>(`${this.basePath}/myInfo?minDate=${minDate}&maxDate=${maxDate}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    getByInfoFromAdmin(userId: string, sede: string, minDate: Date, maxDate: Date) {
        return this.http.get<SaleApiResponse>(`${this.basePath}/infoAdmin?minDate=${minDate}&maxDate=${maxDate}&userId=${userId}&sede=${sede}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    getSalesByDate(date: Date) {
        return this.http.get<SaleApiResponse>(`${this.basePath}/getSalesByDate?date=${date}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    getSalesByDateAndSede(sede: string, date: Date) {
        return this.http.get<SaleApiResponse>(`${this.basePath}/getSalesByDateAndSede?date=${date}&sede=${sede}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }
}
