import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RemissionGuide} from "../../../../admin/models/remissionGuide";
import {RemissionGuideApiResponse} from "../../../../admin/models/apiResponses/remissionGuideApiResponse";
import {RemissionGuideService} from "../../../../admin/services/remission-guide/remission-guide.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {lastValueFrom} from "rxjs";
import {InventoryService} from "../../../services/inventory/inventory.service";
import {Inventory} from "../../../models/inventory";

@Component({
  selector: 'app-stock-reception-sales',
  templateUrl: './stock-reception-sales.component.html',
  styleUrl: './stock-reception-sales.component.css'
})
export class StockReceptionSalesComponent implements OnInit {
    @Input() role: string;
    remissionGuideSelected: boolean;
    remissionGuideAccepted: boolean;
    remissionGuide: RemissionGuide;
    remissionGuides: Array<RemissionGuide>;
    inventoriesFrom: Array<Inventory>;
    inventoriesTo: Array<Inventory>;

    constructor(private remissionGuideService: RemissionGuideService, private inventoryService: InventoryService,
                private snackBar: MatSnackBar, public datePipe: DatePipe) {
        this.role = "";
        this.remissionGuideSelected = false;
        this.remissionGuideAccepted = false;
        this.remissionGuide = {} as RemissionGuide;
        this.remissionGuides = [];
        this.inventoriesFrom = [];
        this.inventoriesTo = [];
    }

    ngOnInit(): void {
        this.remissionGuideService.getAllByMySede().subscribe({
            next: (response: RemissionGuideApiResponse) => {
                this.remissionGuides = response.remissionGuides;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    async selectRemissionGuide() {
        this.remissionGuideSelected = true;
        this.remissionGuideAccepted = this.remissionGuide.status == "Aceptado";

        const getInventoryToPromise = this.inventoryService.getBySede(this.remissionGuide.sedeTo);
        let getInventoryToResponse = await lastValueFrom(getInventoryToPromise);

        const getInventoryFromPromise = this.inventoryService.getBySede(this.remissionGuide.sedeFrom);
        let getInventoryFromResponse = await lastValueFrom(getInventoryFromPromise);

        for (let remissionGuideItem of this.remissionGuide.products) {
            let inventoryToItem = getInventoryToResponse.inventories.find(inventory => inventory.product._id === remissionGuideItem.product._id);
            let inventoryFromItem = getInventoryFromResponse.inventories.find(inventory => inventory.product._id === remissionGuideItem.product._id);

            if (inventoryToItem) {
                inventoryToItem.quantity = inventoryToItem.quantity + remissionGuideItem.quantity;
                this.inventoriesTo.push(inventoryToItem);
            }
            if (inventoryFromItem) {
                inventoryFromItem.quantity = inventoryFromItem.quantity - remissionGuideItem.quantity;
                this.inventoriesFrom.push(inventoryFromItem);
            }
        }
    }

    confirmRemissionGuide() {

    }
}
