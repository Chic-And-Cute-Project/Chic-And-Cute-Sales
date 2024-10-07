import {Component, Input, OnInit} from '@angular/core';
import {Inventory} from "../../../models/inventory";
import {InventoryService} from "../../../services/inventory/inventory.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InventoryApiResponse} from "../../../models/apiResponses/inventoryApiResponse";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock-sales',
  templateUrl: './stock-sales.component.html',
  styleUrl: './stock-sales.component.css'
})
export class StockSalesComponent implements OnInit {
    @Input() role: string;
    productName: string;
    inventories: Array<Inventory>;

    constructor(private inventoryService: InventoryService, private userService: UserService,
                private communicationService: CommunicationService, private snackBar: MatSnackBar,
                private router: Router) {
        this.role = "";
        this.productName = "";
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
        this.refreshInventories();
    }

    refreshInventories() {
        this.inventoryService.getByMySede().subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    searchProduct() {
        if (this.productName != "") {
            this.snackBar.open("Buscando procuctos");
            this.inventoryService.searchMyProductsStock(this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.snackBar.dismiss();
                    this.inventories = response.inventories;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        } else {
            this.snackBar.open("Escribe un nombre", "Entendido", { duration: 2000});
        }
    }

    reloadSearch() {
        this.productName = "";
        this.snackBar.open("Actualizando");
        this.refreshInventories();
    }
}
