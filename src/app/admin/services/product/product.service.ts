import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {ProductApiResponse} from "../../models/apiResponses/productApiResponse";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Product} from "../../models/product";

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService<ProductApiResponse>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'products';
    }

    create(item: Product): Observable<ProductApiResponse> {
        return this.http.post<ProductApiResponse>(this.basePath, JSON.stringify(item), this.httpOptions)
            .pipe(catchError(this.handleError));
    }
}
