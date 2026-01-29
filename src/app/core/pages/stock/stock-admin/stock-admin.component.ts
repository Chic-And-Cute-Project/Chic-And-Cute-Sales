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
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-stock-admin',
  templateUrl: './stock-admin.component.html',
  styleUrl: './stock-admin.component.css'
})
export class StockAdminComponent implements OnInit {
    @Input() role: string;
    sedeSelected: string;
    productName: string;
    searchingMode: boolean;
    productsSize: number;
    pageIndex: number;
    inventories: Array<Inventory>;

    constructor(private inventoryService: InventoryService, private userService: UserService,
                private communicationService: CommunicationService, private snackBar: MatSnackBar,
                private dialog: MatDialog, private router: Router) {
        this.role = "";
        this.productName = "";
        this.searchingMode = false;
        this.productsSize = 0;
        this.pageIndex = 0;
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
        this.refreshInventoryF(0, true);
    }

    refreshInventoryF(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsBySede("Fábrica").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getBySede("Fábrica", page).subscribe({
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
            this.inventoryService.countDocumentsBySede("Molina Plaza").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getBySede("Molina Plaza", page).subscribe({
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
            this.inventoryService.countDocumentsBySede("Web").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getBySede("Web", page).subscribe({
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
            this.inventoryService.countDocumentsBySede("Open Plaza").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getBySede("Open Plaza", page).subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventorySB(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsBySede("Saga Begonia").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getBySede("Saga Begonia", page).subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventorySJP(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsBySede("Saga Jockey Plaza").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getBySede("Saga Jockey Plaza", page).subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventorySM(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsBySede("Saga Miraflores").subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.getBySede("Saga Miraflores", page).subscribe({
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
            this.inventoryService.countDocumentsBySedeAndProduct("Fábrica", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsStock("Fábrica", this.productName, page).subscribe({
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
            this.inventoryService.countDocumentsBySedeAndProduct("Molina Plaza", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsStock("Molina Plaza", this.productName, page).subscribe({
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
            this.inventoryService.countDocumentsBySedeAndProduct("Open Plaza", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsStock("Open Plaza", this.productName, page).subscribe({
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
            this.inventoryService.countDocumentsBySedeAndProduct("Web", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsStock("Web", this.productName, page).subscribe({
            next: response => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", { duration: 2000});
            }
        });
    }

    searchInventorySB(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsBySedeAndProduct("Saga Begonia", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsStock("Saga Begonia", this.productName, page).subscribe({
            next: response => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", { duration: 2000});
            }
        });
    }

    searchInventorySJP(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsBySedeAndProduct("Saga Jockey Plaza", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsStock("Saga Jockey Plaza", this.productName, page).subscribe({
            next: response => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", { duration: 2000});
            }
        });
    }

    searchInventorySM(page: number, firstRequest: boolean): void {
        if (firstRequest) {
            this.inventoryService.countDocumentsBySedeAndProduct("Saga Miraflores", this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.productsSize = response.count;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
        this.inventoryService.searchProductsStock("Saga Miraflores", this.productName, page).subscribe({
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
            if (this.sedeSelected == "Molina Plaza") {
                this.searchInventoryMP(e.pageIndex, false);
            } else if (this.sedeSelected == "Open Plaza") {
                this.searchInventoryOP(e.pageIndex, false);
            } else if (this.sedeSelected == "Fábrica") {
                this.searchInventoryF(e.pageIndex, false);
            } else if (this.sedeSelected == "Saga Begonia") {
                this.searchInventorySB(e.pageIndex, false);
            } else if (this.sedeSelected == "Saga Jockey Plaza") {
                this.searchInventorySJP(e.pageIndex, false);
            } else if (this.sedeSelected == "Saga Miraflores") {
                this.searchInventorySM(e.pageIndex, false);
            } else {
                this.searchInventoryW(e.pageIndex, false);
            }
        } else {
            if (this.sedeSelected == "Molina Plaza") {
                this.refreshInventoryMP(e.pageIndex, false);
            } else if (this.sedeSelected == "Open Plaza") {
                this.refreshInventoryOP(e.pageIndex, false);
            } else if (this.sedeSelected == "Fábrica") {
                this.refreshInventoryF(e.pageIndex, false);
            } else if (this.sedeSelected == "Saga Begonia") {
                this.refreshInventorySB(e.pageIndex, false);
            } else if (this.sedeSelected == "Saga Jockey Plaza") {
                this.refreshInventorySJP(e.pageIndex, false);
            } else if (this.sedeSelected == "Saga Miraflores") {
                this.refreshInventorySM(e.pageIndex, false);
            } else {
                this.refreshInventoryW(e.pageIndex, false);
            }
        }
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
                            this.refreshInventoryF(this.pageIndex, false);
                        } else if (this.sedeSelected == "Molina Plaza") {
                            this.refreshInventoryMP(this.pageIndex, false);
                        } else if (this.sedeSelected == "Open Plaza") {
                            this.refreshInventoryOP(this.pageIndex, false);
                        } else if (this.sedeSelected == "Saga Begonia") {
                            this.refreshInventorySB(this.pageIndex, false);
                        } else if (this.sedeSelected == "Saga Jockey Plaza") {
                            this.refreshInventorySJP(this.pageIndex, false);
                        } else if (this.sedeSelected == "Saga Miraflores") {
                            this.refreshInventorySM(this.pageIndex, false);
                        } else {
                            this.refreshInventoryW(this.pageIndex, false);
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
            this.pageIndex = 0;
            this.searchingMode = true;
            this.snackBar.open("Buscando productos");
            if (this.sedeSelected == "Molina Plaza") {
                this.searchInventoryMP(0, true);
            } else if (this.sedeSelected == "Open Plaza") {
                this.searchInventoryOP(0, true);
            } else if (this.sedeSelected == "Fábrica") {
                this.searchInventoryF(0, true);
            } else if (this.sedeSelected == "Saga Begonia") {
                this.searchInventorySB(0, true);
            } else if (this.sedeSelected == "Saga Jockey Plaza") {
                this.searchInventorySJP(0, true);
            } else if (this.sedeSelected == "Saga Miraflores") {
                this.searchInventorySM(0, true);
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
            this.snackBar.open("Actualizando");
            if (this.sedeSelected == "Fábrica") {
                this.refreshInventoryF(0, true);
            } else if (this.sedeSelected == "Molina Plaza") {
                this.refreshInventoryMP(0, true);
            } else if (this.sedeSelected == "Web") {
                this.refreshInventoryW(0, true);
            } else if (this.sedeSelected == "Saga Begonia") {
                this.refreshInventorySB(0, true);
            } else if (this.sedeSelected == "Saga Jockey Plaza") {
                this.refreshInventorySJP(0, true);
            } else if (this.sedeSelected == "Saga Miraflores") {
                this.refreshInventorySM(0, true);
            } else {
                this.refreshInventoryOP(0, true);
            }
        } else {
            if (this.searchingMode) {
                this.pageIndex = 0;
                this.searchingMode = false;
                this.productName = "";
                this.snackBar.open("Actualizando");
                if (this.sedeSelected == "Fábrica") {
                    this.refreshInventoryF(0, true);
                } else if (this.sedeSelected == "Molina Plaza") {
                    this.refreshInventoryMP(0, true);
                } else if (this.sedeSelected == "Web") {
                    this.refreshInventoryW(0, true);
                } else if (this.sedeSelected == "Saga Begonia") {
                    this.refreshInventorySB(0, true);
                } else if (this.sedeSelected == "Saga Jockey Plaza") {
                    this.refreshInventorySJP(0, true);
                } else if (this.sedeSelected == "Saga Miraflores") {
                    this.refreshInventorySM(0, true);
                } else {
                    this.refreshInventoryOP(0, true);
                }
            }
        }
    }
}
