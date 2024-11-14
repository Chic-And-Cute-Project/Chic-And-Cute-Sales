import {Component, Input, OnInit} from '@angular/core';
import {RemissionGuideService} from "../../../../admin/services/remission-guide/remission-guide.service";
import {RemissionGuide} from "../../../../admin/models/remissionGuide";
import {RemissionGuideApiResponse} from "../../../../admin/models/apiResponses/remissionGuideApiResponse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";
import {InventoryService} from "../../../services/inventory/inventory.service";
import {Inventory} from "../../../models/inventory";
import {lastValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";

@Component({
  selector: 'app-stock-reception-admin',
  templateUrl: './stock-reception-admin.component.html',
  styleUrl: './stock-reception-admin.component.css'
})
export class StockReceptionAdminComponent implements OnInit {
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
        this.remissionGuideService.getAll().subscribe({
            next: (response: RemissionGuideApiResponse) => {
                this.remissionGuides = response.remissionGuides;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    selectRemissionGuide() {
        this.remissionGuideSelected = true;
        this.remissionGuideAccepted = this.remissionGuide.status == "Aceptado";
    }

    async confirmRemissionGuide() {
        this.snackBar.open("Actualizando inventarios");
        for (let remissionGuideItem of this.remissionGuide.products) {
            //Obtener inventario actual de sede destino
            const getInventoryByProductAndSedeToPromise = this.inventoryService.getProductBySede(this.remissionGuide.sedeTo, remissionGuideItem.product._id);
            let inventoryByProductAndSedeToResponse =  await lastValueFrom(getInventoryByProductAndSedeToPromise);
            let inventoryTo = inventoryByProductAndSedeToResponse.inventory;

            //Agregacion y actualizacion de stock en sede destino
            inventoryTo.quantity = inventoryTo.quantity + remissionGuideItem.quantity;
            const updateInventoryToPromise = this.inventoryService.update(inventoryTo._id, inventoryTo);
            await lastValueFrom(updateInventoryToPromise);

            //Obtener inventario actual de sede origen
            const getInventoryByProductAndSedeFromPromise = this.inventoryService.getProductBySede(this.remissionGuide.sedeFrom, remissionGuideItem.product._id);
            let inventoryByProductAndSedeFromResponse =  await lastValueFrom(getInventoryByProductAndSedeFromPromise);
            let inventoryFrom = inventoryByProductAndSedeFromResponse.inventory;

            //Disminucion y actualizacion de stock en sede origen
            inventoryFrom.quantity = inventoryFrom.quantity - remissionGuideItem.quantity;
            const updateInventoryFromPromise = this.inventoryService.update(inventoryFrom._id, inventoryFrom);
            await lastValueFrom(updateInventoryFromPromise);
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
