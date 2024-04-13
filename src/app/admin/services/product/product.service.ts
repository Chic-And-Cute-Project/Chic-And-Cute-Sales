import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {ProductApiResponse} from "../../models/apiResponses/productApiResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Product} from "../../models/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService<ProductApiResponse>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'products';
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        };
    }

    create(item: Product): Observable<ProductApiResponse> {
        return this.http.post<ProductApiResponse>(this.basePath, JSON.stringify(item), this.httpOptions)
            .pipe(catchError(this.handleError));
    }
}
