import {Component, Input, OnInit} from '@angular/core';
import {InventoryService} from "../../../services/inventory/inventory.service";
import {InventoryApiResponse} from "../../../models/apiResponses/inventoryApiResponse";
import {Inventory} from "../../../models/inventory";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditInventoryDialogComponent} from "../../../dialogs/edit-inventory/edit-inventory-dialog.component";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock-admin',
  templateUrl: './stock-admin.component.html',
  styleUrl: './stock-admin.component.css'
})
export class StockAdminComponent implements OnInit {
    @Input() role: string;
    sedeSelected: string;
    productName: string;
    inventories: Array<Inventory>;

    constructor(private inventoryService: InventoryService, private userService: UserService,
                private communicationService: CommunicationService, private snackBar: MatSnackBar,
                private dialog: MatDialog, private router: Router) {
        this.role = "";
        this.productName = "";
        this.sedeSelected = "Fábrica";
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
        this.refreshInventoryF();
    }

    refreshInventoryF(): void {
        this.inventoryService.getBySede("Fábrica").subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryMP(): void {
        this.inventoryService.getBySede("Molina Plaza").subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryW(): void {
        this.inventoryService.getBySede("Web").subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryOP(): void {
        this.inventoryService.getBySede("Open Plaza").subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    editInventory(inventory: Inventory) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            inventory: {...inventory}
        }

        const dialogRef = this.dialog.open(EditInventoryDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result: { inventory: Inventory }) => {
            if (result) {
                this.snackBar.open("Actualizando inventario");
                this.inventoryService.update(result.inventory._id, result.inventory).subscribe({
                    next: () => {
                        this.snackBar.dismiss();
                        if (this.sedeSelected == "Fábrica") {
                            this.refreshInventoryF();
                        } else if (this.sedeSelected == "Molina Plaza") {
                            this.refreshInventoryMP();
                        } else {
                            this.refreshInventoryOP();
                        }
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", {duration: 2000});
                    }
                });
            }
        });
    }

    searchProduct() {
        if (this.productName != "") {
            this.snackBar.open("Buscando procuctos");
            if (this.sedeSelected == "Fábrica") {
                this.inventoryService.searchProductsStock("Fábrica", this.productName).subscribe({
                    next: response => {
                        this.snackBar.dismiss();
                        this.inventories = response.inventories;
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", { duration: 2000});
                    }
                });
            } else if (this.sedeSelected == "Molina Plaza") {
                this.inventoryService.searchProductsStock("Molina Plaza", this.productName).subscribe({
                    next: response => {
                        this.snackBar.dismiss();
                        this.inventories = response.inventories;
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", { duration: 2000});
                    }
                });
            } else {
                this.inventoryService.searchProductsStock("Open Plaza", this.productName).subscribe({
                    next: response => {
                        this.snackBar.dismiss();
                        this.inventories = response.inventories;
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", { duration: 2000});
                    }
                });
            }
        } else {
            this.snackBar.open("Escribe un nombre", "Entendido", { duration: 2000});
        }
    }

    reloadSearch() {
        this.productName = "";
        this.snackBar.open("Actualizando");
        if (this.sedeSelected == "Fábrica") {
            this.refreshInventoryF();
        } else if (this.sedeSelected == "Molina Plaza") {
            this.refreshInventoryMP();
        } else if (this.sedeSelected == "Web") {
            this.refreshInventoryW();
        } else {
            this.refreshInventoryOP();
        }
    }
}
