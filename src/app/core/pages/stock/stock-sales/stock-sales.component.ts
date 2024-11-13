import {Component, Input, OnInit} from '@angular/core';
import {Inventory} from "../../../models/inventory";
import {InventoryService} from "../../../services/inventory/inventory.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InventoryApiResponse} from "../../../models/apiResponses/inventoryApiResponse";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-stock-sales',
  templateUrl: './stock-sales.component.html',
  styleUrl: './stock-sales.component.css'
})
export class StockSalesComponent implements OnInit {
    @Input() role: string;
    productName: string;
    searchingMode: boolean;
    productsSize: number;
    pageIndex: number;
    inventories: Array<Inventory>;

    constructor(private inventoryService: InventoryService, private userService: UserService,
                private communicationService: CommunicationService, private snackBar: MatSnackBar,
                private router: Router) {
        this.role = "";
        this.productName = "";
        this.searchingMode = false;
        this.productsSize = 0;
        this.pageIndex = 0;
        this.inventories = [];
    }

    ngOnInit(): void {
        if (localStorage.getItem('token')) {
            this.userService.getObject().subscribe({
                next: (response: UserApiResponse) => {
                    this.communicationService.emitTitleChange({ name: response.user.name + " " + response.user.lastName, sede: response.user.sede });
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                    if (e.message == "Vuelva a iniciar sesión") {
                        localStorage.clear();
                        this.router.navigate(['/login']).then();
                    }
                }
            });
        } else {
            this.snackBar.open("Vuelva a iniciar sesión", "Entendido", {duration: 2000});
            this.router.navigate(['/login']).then();
        }
        this.refreshInventories(0, true);
    }

    refreshInventories(page: number, firstRequest: boolean) {
        if (firstRequest) {
            this.inventoryService.countDocumentsByMySede().subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getByMySede(page).subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    searchInventory(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsByMySedeAndProduct(this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchMyProductsStock(this.productName, page).subscribe({
            next: response => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", { duration: 2000});
            }
        });
    }

    handlePageEvent(e: PageEvent) {
        this.pageIndex = e.pageIndex;
        if (this.searchingMode) {
            this.searchInventory(e.pageIndex, false);
        } else {
            this.refreshInventories(e.pageIndex, false);
        }
    }

    searchProduct() {
        if (this.productName != "") {
            this.pageIndex = 0;
            this.searchingMode = true;
            this.snackBar.open("Buscando procuctos");
            this.searchInventory(0, true);
        } else {
            this.snackBar.open("Escribe un nombre", "Entendido", { duration: 2000});
        }
    }

    reloadSearch() {
        if (this.searchingMode) {
            this.pageIndex = 0;
            this.searchingMode = false;
            this.productName = "";
            this.snackBar.open("Actualizando");
            this.refreshInventories(0, true);
        }
    }
}
