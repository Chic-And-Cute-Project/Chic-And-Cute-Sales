import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {DiscountApiResponse} from "../../models/apiResponses/discountApiResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Discount} from "../../models/discount";

@Injectable({
    providedIn: 'root'
})
export class DiscountService extends BaseService<DiscountApiResponse>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'discounts';
    }

    create(item: Discount): Observable<DiscountApiResponse> {
        return this.http.post<DiscountApiResponse>(this.basePath, JSON.stringify(item), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    update(discountId: string, discount: Discount): Observable<DiscountApiResponse> {
        return this.http.put<DiscountApiResponse>(`${this.basePath}?discountId=${discountId}`, discount, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }
}
