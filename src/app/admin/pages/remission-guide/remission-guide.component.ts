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
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-remission-guide',
    templateUrl: './remission-guide.component.html',
    styleUrl: './remission-guide.component.css'
})
export class RemissionGuideComponent implements OnInit{
    productName: string;
    step: string;
    disableInventoryInput: boolean;
    searchingMode: boolean;
    productsSize: number;
    pageIndex: number;
    remissionGuide: RemissionGuide;
    inventories: Array<Inventory>;
    sedesDestiny: Array<string>;

    constructor(private inventoryService: InventoryService, private remissionGuideService: RemissionGuideService,
                private userService: UserService, private communicationService: CommunicationService,
                private snackBar: MatSnackBar, private router: Router) {
        this.productName = "";
        this.step = "1";
        this.disableInventoryInput = false;
        this.searchingMode = false;
        this.productsSize = 0;
        this.pageIndex = 0;
        this.remissionGuide = {} as RemissionGuide;
        this.remissionGuide.sedeFrom = "Fábrica";
        this.remissionGuide.products = [];
        this.inventories = [];
        this.sedesDestiny = ["Molina Plaza", "Open Plaza", "Fábrica", "Web"];
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
        this.refreshInventoryF(0, true);
    }

    refreshInventoryF(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsAvailableBySede("Fábrica").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getAvailableBySede("Fábrica", page).subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryMP(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsAvailableBySede("Molina Plaza").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getAvailableBySede("Molina Plaza", page).subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryOP(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsAvailableBySede("Open Plaza").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getAvailableBySede("Open Plaza", page).subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventoryW(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsAvailableBySede("Web").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getAvailableBySede("Web", page).subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    searchInventoryF(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsAvailableBySedeAndProduct("Fábrica", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsAvailable("Fábrica", this.productName, page).subscribe({
            next: response => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", { duration: 2000});
            }
        });
    }

    searchInventoryMP(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsAvailableBySedeAndProduct("Molina Plaza", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsAvailable("Molina Plaza", this.productName, page).subscribe({
            next: response => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", { duration: 2000});
            }
        });
    }

    searchInventoryOP(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsAvailableBySedeAndProduct("Open Plaza", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsAvailable("Open Plaza", this.productName, page).subscribe({
            next: response => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", { duration: 2000});
            }
        });
    }

    searchInventoryW(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsAvailableBySedeAndProduct("Web", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsAvailable("Web", this.productName, page).subscribe({
            next: response => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", { duration: 2000});
            }
        });
    }

    handlePageEvent(e: PageEvent) {
        this.pageIndex = e.pageIndex;
        if (this.searchingMode) {
            if (this.remissionGuide.sedeFrom == "Fábrica") {
                this.searchInventoryF(e.pageIndex, false);
            } else if (this.remissionGuide.sedeFrom == "Molina Plaza") {
                this.searchInventoryMP(e.pageIndex, false);
            } else if (this.remissionGuide.sedeFrom == "Open Plaza") {
                this.searchInventoryOP(e.pageIndex, false);
            } else {
                this.searchInventoryW(e.pageIndex, false);
            }
        } else {
            if (this.remissionGuide.sedeFrom == "Fábrica") {
                this.refreshInventoryF(e.pageIndex, false);
            } else if (this.remissionGuide.sedeFrom == "Molina Plaza") {
                this.refreshInventoryMP(e.pageIndex, false);
            } else if (this.remissionGuide.sedeFrom == "Open Plaza") {
                this.refreshInventoryOP(e.pageIndex, false);
            } else {
                this.refreshInventoryW(e.pageIndex, false);
            }
        }
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
            this.pageIndex = 0;
            this.searchingMode = true;
            this.snackBar.open("Buscando procuctos");
            if (this.remissionGuide.sedeFrom == "Fábrica") {
                this.searchInventoryF(0, true);
            } else if (this.remissionGuide.sedeFrom == "Molina Plaza") {
                this.searchInventoryMP(0, true);
            } else if (this.remissionGuide.sedeFrom == "Open Plaza") {
                this.searchInventoryOP(0, true);
            } else {
                this.searchInventoryW(0, true);
            }
        } else {
            this.snackBar.open("Escribe un nombre", "Entendido", { duration: 2000});
        }
    }

    reloadSearch(changeSede: boolean) {
        if (changeSede) {
            this.pageIndex = 0;
            this.productName = "";
            this.remissionGuide.products = [];
            this.snackBar.open("Actualizando");
            if (this.remissionGuide.sedeFrom == "Fábrica") {
                this.refreshInventoryF(0, true);
            } else if (this.remissionGuide.sedeFrom == "Molina Plaza") {
                this.refreshInventoryMP(0, true);
            } else if (this.remissionGuide.sedeFrom == "Open Plaza") {
                this.refreshInventoryOP(0, true);
            } else {
                this.refreshInventoryW(0, true);
            }
        } else {
            if (this.searchingMode) {
                this.pageIndex = 0;
                this.searchingMode = false;
                this.productName = "";
                this.snackBar.open("Actualizando");
                if (this.remissionGuide.sedeFrom == "Fábrica") {
                    this.refreshInventoryMP(0, true);
                } else if (this.remissionGuide.sedeFrom == "Molina Plaza") {
                    this.refreshInventoryMP(0, true);
                } else if (this.remissionGuide.sedeFrom == "Open Plaza") {
                    this.refreshInventoryOP(0, true);
                } else {
                    this.refreshInventoryW(0, true);
                }
            }
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
