import {Component, Input, OnInit} from '@angular/core';
import {InventoryService} from "../../../services/inventory/inventory.service";
import {InventoryApiResponse} from "../../../models/apiResponses/inventoryApiResponse";
import {Inventory} from "../../../models/inventory";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditInventoryDialogComponent} from "../../../dialogs/edit-inventory/edit-inventory-dialog.component";

@Component({
  selector: 'app-stock-admin',
  templateUrl: './stock-admin.component.html',
  styleUrl: './stock-admin.component.css'
})
export class StockAdminComponent implements OnInit {
    @Input() role: string;
    sedeSelected: string;
    productName: string;
    sedes: Array<string>;
    inventoriesShow: Array<Inventory>;

    constructor(private inventoryService: InventoryService, private snackBar: MatSnackBar,
                private dialog: MatDialog) {
        this.role = "";
        this.productName = "";
        this.sedeSelected = "Fábrica";
        this.sedes = ["Molina Plaza", "Open Plaza", "Fábrica"];
        this.inventoriesShow = [];
    }

    ngOnInit(): void {
        this.refreshInventoryF();
    }

    refreshInventoryF(): void {
        this.inventoryService.getBySede("Fábrica").subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventoriesShow = response.inventories;
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
                this.inventoriesShow = response.inventories;
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
                this.inventoriesShow = response.inventories;
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

    searchSale() {
        if (this.productName != "") {
            this.snackBar.open("Buscando procuctos");
            if (this.sedeSelected == "Fábrica") {
                this.inventoryService.searchProducts("Fábrica", this.productName).subscribe({
                    next: response => {
                        this.snackBar.dismiss();
                        this.inventoriesShow = response.inventories;
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", { duration: 2000});
                    }
                });
            } else if (this.sedeSelected == "Molina Plaza") {
                this.inventoryService.searchProducts("Molina Plaza", this.productName).subscribe({
                    next: response => {
                        this.snackBar.dismiss();
                        this.inventoriesShow = response.inventories;
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", { duration: 2000});
                    }
                });
            } else {
                this.inventoryService.searchProducts("Open Plaza", this.productName).subscribe({
                    next: response => {
                        this.snackBar.dismiss();
                        this.inventoriesShow = response.inventories;
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
        } else {
            this.refreshInventoryOP();
        }
    }
}
