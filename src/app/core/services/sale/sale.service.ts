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
}
