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

    update(productId: string, product: Product): Observable<ProductApiResponse> {
        return this.http.put<ProductApiResponse>(`${this.basePath}?productId=${productId}`, product, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    searchProducts(productName: string, page: number): Observable<ProductApiResponse> {
        return this.http.get<ProductApiResponse>(`${this.basePath}/search?productName=${productName}&page=${page}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    countDocumentsByMyProduct(productName: string): Observable<ProductApiResponse> {
        return this.http.get<ProductApiResponse>(`${this.basePath}/countByProduct?productName=${productName}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    getByCode(productCode: string): Observable<ProductApiResponse> {
        return this.http.get<ProductApiResponse>(`${this.basePath}/code?productCode=${productCode}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }
}
