import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Inventory} from "../../../core/models/inventory";
import {InventoryService} from "../../../core/services/inventory/inventory.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InventoryApiResponse} from "../../../core/models/apiResponses/inventoryApiResponse";
import {RemissionGuide} from "../../models/remissionGuide";
import {RemissionGuideItem} from "../../models/remissionGuideItem";
import {RemissionGuideService} from "../../services/remission-guide/remission-guide.service";
import {UserApiResponse} from "../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../core/services/user/user.service";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";

@Component({
    selector: 'app-remission-guide',
    templateUrl: './remission-guide.component.html',
    styleUrl: './remission-guide.component.css'
})
export class RemissionGuideComponent implements OnInit{
    productName: string;
    step: string;
    disableInventoryInput: boolean;
    remissionGuide: RemissionGuide;
    inventories: Array<Inventory>;
    sedesDestiny: Array<string>;

    constructor(private inventoryService: InventoryService, private remissionGuideService: RemissionGuideService,
                private userService: UserService, private communicationService: CommunicationService,
                private snackBar: MatSnackBar, private router: Router) {
        this.productName = "";
        this.step = "1";
        this.disableInventoryInput = false;
        this.remissionGuide = {} as RemissionGuide;
        this.remissionGuide.sedeFrom = "Fábrica";
        this.remissionGuide.products = [];
        this.inventories = [];
        this.sedesDestiny = ["Molina Plaza", "Open Plaza", "Fábrica"];
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
        this.inventoryService.getAvailableBySede("Fábrica").subscribe({
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
        this.inventoryService.getAvailableBySede("Molina Plaza").subscribe({
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
        this.inventoryService.getAvailableBySede("Open Plaza").subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    selectProduct(inventoryToAdd: Inventory) {
        let elementExisting = false;
        this.remissionGuide.products.forEach(remissionGuideItem => {
            if (remissionGuideItem.product._id == inventoryToAdd.product._id) {
                elementExisting = true;
            }
        });
        if (!elementExisting) {
            let product: RemissionGuideItem = { product: inventoryToAdd.product, quantity: inventoryToAdd.quantity, maxQuantity: inventoryToAdd.quantity } as RemissionGuideItem;
            this.remissionGuide.products.push(product);
        }
    }

    nextStep() {
        if (this.remissionGuide.products.length != 0) {
            this.disableInventoryInput = true;
            this.step = "2";
            this.sedesDestiny = this.sedesDestiny.filter(sede => sede != this.remissionGuide.sedeFrom);
        } else {
            this.snackBar.open("La guia esta vacia", "Entendido", {duration: 2000});
        }
    }

    deleteFromArray(index: number) {
        this.remissionGuide.products.splice(index, 1);
    }

    searchProduct() {
        if (this.productName != "") {
            this.snackBar.open("Buscando procuctos");
            if (this.remissionGuide.sedeFrom == "Fábrica") {
                this.inventoryService.searchProducts("Fábrica", this.productName).subscribe({
                    next: response => {
                        this.snackBar.dismiss();
                        this.inventories = response.inventories;
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", { duration: 2000});
                    }
                });
            } else if (this.remissionGuide.sedeFrom == "Molina Plaza") {
                this.inventoryService.searchProducts("Molina Plaza", this.productName).subscribe({
                    next: response => {
                        this.snackBar.dismiss();
                        this.inventories = response.inventories;
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", { duration: 2000});
                    }
                });
            } else {
                this.inventoryService.searchProducts("Open Plaza", this.productName).subscribe({
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

    reloadSearch(searching: boolean) {
        if (!searching) {
            this.remissionGuide.products = [];
        }
        this.productName = "";
        this.snackBar.open("Actualizando");
        if (this.remissionGuide.sedeFrom == "Fábrica") {
            this.refreshInventoryF();
        } else if (this.remissionGuide.sedeFrom == "Molina Plaza") {
            this.refreshInventoryMP();
        } else {
            this.refreshInventoryOP();
        }
    }

    createRemissionGuide() {
        this.snackBar.open("Creando guia de remision");
        this.remissionGuideService.create(this.remissionGuide).subscribe({
            next: () => {
                this.snackBar.dismiss();
                this.router.navigate(['/stock-reception/Admin']).then();
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }
}
