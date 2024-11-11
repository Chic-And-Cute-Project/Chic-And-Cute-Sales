import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {DiscountService} from "../../services/discount/discount.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductApiResponse} from "../../models/apiResponses/productApiResponse";
import {Product} from "../../models/product";
import {Discount} from "../../models/discount";
import {DiscountApiResponse} from "../../models/apiResponses/discountApiResponse";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddProductDialogComponent} from "../../dialogs/add-product/add-product-dialog.component";
import {AddDiscountDialogComponent} from "../../dialogs/add-discount/add-discount-dialog.component";
import {InventoryService} from "../../../core/services/inventory/inventory.service";
import {lastValueFrom} from "rxjs";
import {UserApiResponse} from "../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../core/services/user/user.service";
import {CommunicationService} from "../../../shared/services/communicacion/communication.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-products-discounts',
  templateUrl: './products-discounts.component.html',
  styleUrl: './products-discounts.component.css'
})
export class ProductsDiscountsComponent implements OnInit{
    productsSize: number;
    discounts: Array<Discount>;
    products: Array<Product>;

    constructor(private productService: ProductService, private discountService: DiscountService,
                private inventoryService: InventoryService, private userService: UserService,
                private communicationService: CommunicationService, private router: Router,
                private snackBar: MatSnackBar, private dialog: MatDialog) {
        this.productsSize = 0;
        this.discounts = [];
        this.products =  [];
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
        this.refreshDiscounts();
        this.refreshProductsCount();
        this.refreshProducts(0);
    }

    refreshProductsCount(): void {
        this.productService.countDocuments().subscribe({
            next: (response: ProductApiResponse) => {
                this.productsSize = response.count;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshProducts(page: number): void {
        this.productService.getByPage(page).subscribe({
            next: (response: ProductApiResponse) => {
                this.products = response.products;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshDiscounts(): void {
        this.discountService.getAll().subscribe({
            next: (response: DiscountApiResponse) => {
                this.discounts = response.discounts;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    handlePageEvent(e: PageEvent) {
        this.refreshProducts(e.pageIndex);
    }

    createProduct() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            product: {}
        }

        const dialogRef = this.dialog.open(AddProductDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result: { product: Product }) => {
            if (result) {
                this.snackBar.open("Creando producto e inventario en sedes");
                this.productService.create(result.product).subscribe({
                    next: async (response: ProductApiResponse) => {
                        const createInventoryMPResponse = this.inventoryService.create(
                            {sede: "Molina Plaza", product: response.product._id}
                        );
                        await lastValueFrom(createInventoryMPResponse);

                        const createInventoryOPResponse = this.inventoryService.create(
                            {sede: "Open Plaza", product: response.product._id}
                        );
                        await lastValueFrom(createInventoryOPResponse);

                        const createInventoryFResponse = this.inventoryService.create(
                            {sede: "Fábrica", product: response.product._id}
                        );
                        await lastValueFrom(createInventoryFResponse);

                        const createInventoryWResponse = this.inventoryService.create(
                            {sede: "Web", product: response.product._id}
                        );
                        await lastValueFrom(createInventoryWResponse);

                        this.refreshProductsCount();
                        this.snackBar.dismiss();
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", {duration: 2000});
                    }
                });
            }
        });
    }

    createDiscount() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            discount: {}
        }

        const dialogRef = this.dialog.open(AddDiscountDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result: { discount: Discount }) => {
            if (result) {
                this.snackBar.open("Creando descuento");
                this.discountService.create(result.discount).subscribe({
                    next: (response: DiscountApiResponse) => {
                        this.snackBar.dismiss();
                        this.discounts.push(response.discount);
                    },
                    error: (e) => {
                        this.snackBar.open(e.message, "Entendido", {duration: 2000});
                    }
                });
            }
        });
    }
}
