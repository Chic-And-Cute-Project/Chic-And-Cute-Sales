import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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

@Component({
  selector: 'app-products-discounts',
  templateUrl: './products-discounts.component.html',
  styleUrl: './products-discounts.component.css'
})
export class ProductsDiscountsComponent implements OnInit{
    role: string;
    products: Array<Product>;
    discounts: Array<Discount>;

    constructor(private productService: ProductService, private discountService: DiscountService,
                private snackBar: MatSnackBar, private dialog: MatDialog,
                private route: ActivatedRoute) {
        this.role = this.route.snapshot.params['role'];
        this.products = [];
        this.discounts = [];
    }

    ngOnInit(): void {
        this.refreshProducts();
        this.refreshDiscounts();
    }

    refreshProducts(): void {
        this.productService.getAll().subscribe({
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

    createProduct() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            product: {}
        }

        const dialogRef = this.dialog.open(AddProductDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result: { product: Product }) => {
            this.productService.create(result.product).subscribe( response => {
                this.products.push(response.product);
            });
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
            this.discountService.create(result.discount).subscribe( response => {
                this.discounts.push(response.discount);
            });
        });
    }
}
