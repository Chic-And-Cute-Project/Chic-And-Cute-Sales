import {Component, Input, OnInit} from '@angular/core';
import {Inventory} from "../../../models/inventory";
import {InventoryService} from "../../../services/inventory/inventory.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InventoryApiResponse} from "../../../models/apiResponses/inventoryApiResponse";

@Component({
  selector: 'app-stock-sales',
  templateUrl: './stock-sales.component.html',
  styleUrl: './stock-sales.component.css'
})
export class StockSalesComponent implements OnInit {
    @Input() role: string;
    inventories: Array<Inventory>;

    constructor(private inventoryService: InventoryService, private snackBar: MatSnackBar) {
        this.role = "";
        this.inventories = [];
    }

    ngOnInit(): void {
        this.inventoryService.getByMySede().subscribe({
            next: (response: InventoryApiResponse) => {
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }
}