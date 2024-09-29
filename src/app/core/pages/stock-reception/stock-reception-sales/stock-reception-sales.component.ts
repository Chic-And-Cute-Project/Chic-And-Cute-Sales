import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {RemissionGuide} from "../../../../admin/models/remissionGuide";
import {RemissionGuideApiResponse} from "../../../../admin/models/apiResponses/remissionGuideApiResponse";
import {RemissionGuideService} from "../../../../admin/services/remission-guide/remission-guide.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {lastValueFrom} from "rxjs";
import {InventoryService} from "../../../services/inventory/inventory.service";
import {Inventory} from "../../../models/inventory";
import {Router} from "@angular/router";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";

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
                private userService: UserService, private communicationService: CommunicationService,
                private snackBar: MatSnackBar, public datePipe: DatePipe,
                private router: Router) {
        this.role = "";
        this.remissionGuideSelected = false;
        this.remissionGuideAccepted = false;
        this.remissionGuide = {} as RemissionGuide;
        this.remissionGuides = [];
        this.inventoriesFrom = [];
        this.inventoriesTo = [];
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

        if (!this.remissionGuideAccepted) {
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
    }

    async confirmRemissionGuide() {
        this.snackBar.open("Actualizando inventarios");
        for (let inventory of this.inventoriesTo) {
            const updateInventoryToPromise = this.inventoryService.update(inventory._id, inventory);
            await lastValueFrom(updateInventoryToPromise);
        }
        for (let inventory of this.inventoriesFrom) {
            const updateInventoryToPromise = this.inventoryService.update(inventory._id, inventory);
            await lastValueFrom(updateInventoryToPromise);
        }
        this.remissionGuideService.updateState(this.remissionGuide._id).subscribe({
            next: () => {
                this.snackBar.dismiss();
                this.router.navigate(['/home', this.role]).then();
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }
}
