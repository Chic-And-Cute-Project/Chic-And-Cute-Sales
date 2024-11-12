import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base/base.service";
import {InventoryApiResponse} from "../../models/apiResponses/inventoryApiResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Inventory} from "../../models/inventory";

@Injectable({
    providedIn: 'root'
})
export class InventoryService extends BaseService<InventoryApiResponse>{

    constructor(http: HttpClient) {
        super(http);
        this.basePath = this.basePath + 'inventories';
    }

    create(item: { sede: string, product: string }): Observable<InventoryApiResponse> {
        return this.http.post<InventoryApiResponse>(this.basePath, JSON.stringify(item), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    getBySede(sede: string): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/sede?sede=${sede}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    update(inventoryId: string, inventory: Inventory): Observable<InventoryApiResponse> {
        return this.http.put<InventoryApiResponse>(`${this.basePath}?idInventory=${inventoryId}`, inventory, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    getByMySede(): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/mySede`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    getAvailableBySede(sede: string, page: number): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/availableSedePages?sede=${sede}&page=${page}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    countDocumentsAvailableBySede(sede: string): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/countBySedeAndAvailable?sede=${sede}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    getAvailableByMySede(page: number): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/myAvailableSede?page=${page}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    countDocumentsAvailableByMySede(): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/countByMySedeAndAvailable`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    searchProductsStock(sede: string, productName: string): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/searchStock?productName=${productName}&sede=${sede}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    searchProductsAvailable(sede: string, productName: string, page: number): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/searchAvailablePages?productName=${productName}&sede=${sede}&page=${page}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    countDocumentsAvailableBySedeAndProduct(sede: string, productName: string): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/countBySedeAndProductAndAvailable?sede=${sede}&productName=${productName}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    searchMyProductsStock(productName: string): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/mySearchStock?productName=${productName}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    searchMyProductsAvailable(productName: string, page: number): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/mySearchAvailable?productName=${productName}&page=${page}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }

    countDocumentsAvailableByMySedeAndProduct(productName: string): Observable<InventoryApiResponse> {
        return this.http.get<InventoryApiResponse>(`${this.basePath}/countByMySedeAndProductAndAvailable?productName=${productName}`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            })
        }).pipe(catchError(this.handleError));
    }
}
