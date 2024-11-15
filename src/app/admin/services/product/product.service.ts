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
    }

    create(item: Product): Observable<ProductApiResponse> {
        return this.http.post<ProductApiResponse>(this.basePath, JSON.stringify(item), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    getByPage(page: number): Observable<ProductApiResponse> {
        return this.http.get<ProductApiResponse>(`${this.basePath}/listByPage?page=${page}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    deleteProduct(productId: string): Observable<ProductApiResponse> {
        return this.http.delete<ProductApiResponse>(`${this.basePath}?productId=${productId}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }
}
