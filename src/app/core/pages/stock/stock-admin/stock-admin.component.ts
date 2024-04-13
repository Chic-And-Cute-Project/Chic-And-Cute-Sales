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
    sedes: Array<string>;
    inventoriesMP: Array<Inventory>;
    inventoriesOP: Array<Inventory>;
    inventoriesF: Array<Inventory>;

    constructor(private inventoryService: InventoryService, private snackBar: MatSnackBar,
                private dialog: MatDialog) {
        this.role = "";
        this.sedeSelected = "Fábrica";
        this.sedes = ["Molina Plaza", "Open Plaza", "Fábrica"];
        this.inventoriesMP = [];
        this.inventoriesOP = [];
        this.inventoriesF = [];
    }

    ngOnInit(): void {
        this.refreshInventoryF();
        this.refreshInventoryMP();
        this.refreshInventoryOP();
    }

    refreshInventoryF(): void {
        this.inventoryService.getBySede("Fábrica").subscribe({
            next: (response: InventoryApiResponse) => {
                this.inventoriesF = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryMP(): void {
        this.inventoryService.getBySede("Molina Plaza").subscribe({
            next: (response: InventoryApiResponse) => {
                this.inventoriesMP = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryOP(): void {
        this.inventoryService.getBySede("Open Plaza").subscribe({
            next: (response: InventoryApiResponse) => {
                this.inventoriesOP = response.inventories;
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
}
