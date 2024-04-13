import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Inventory} from "../../../core/models/inventory";
import {InventoryService} from "../../../core/services/inventory/inventory.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InventoryApiResponse} from "../../../core/models/apiResponses/inventoryApiResponse";

@Component({
    selector: 'app-remission-guide',
    templateUrl: './remission-guide.component.html',
    styleUrl: './remission-guide.component.css'
})
export class RemissionGuideComponent implements OnInit{
    role: string;
    sedeSelected: string;
    inventoriesMP: Array<Inventory>;
    inventoriesOP: Array<Inventory>;
    inventoriesF: Array<Inventory>;
    inventoriesToGuide: Array<Inventory>;
    sedes: Array<string>;

    constructor(private inventoryService: InventoryService, private snackBar: MatSnackBar,
                private route: ActivatedRoute) {
        this.role = this.route.snapshot.params['role'];
        this.sedeSelected = "Fábrica";
        this.inventoriesMP = [];
        this.inventoriesOP = [];
        this.inventoriesF = [];
        this.inventoriesToGuide = [];
        this.sedes = ["Molina Plaza", "Open Plaza", "Fábrica"];
    }

    ngOnInit(): void {
        this.refreshInventoryF();
        this.refreshInventoryMP();
        this.refreshInventoryOP();
    }

    refreshInventoryF(): void {
        this.inventoryService.getAvailableBySede("Fábrica").subscribe({
            next: (response: InventoryApiResponse) => {
                this.inventoriesF = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryMP(): void {
        this.inventoryService.getAvailableBySede("Molina Plaza").subscribe({
            next: (response: InventoryApiResponse) => {
                this.inventoriesMP = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryOP(): void {
        this.inventoryService.getAvailableBySede("Open Plaza").subscribe({
            next: (response: InventoryApiResponse) => {
                this.inventoriesOP = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    selectProduct(inventory: Inventory) {
        this.inventoriesToGuide.push(inventory);
    }

    nextStep() {

    }

    selectSede() {
        this.inventoriesToGuide = [];
    }

    deleteFromArray(inventoryDelete: Inventory) {
        this.inventoriesToGuide = this.inventoriesToGuide.filter(inventory => inventory._id != inventoryDelete._id);
    }
}
