import {Component, Input, OnInit} from '@angular/core';
import {InventoryService} from "../../../services/inventory/inventory.service";
import {InventoryApiResponse} from "../../../models/apiResponses/inventoryApiResponse";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Inventory} from "../../../models/inventory";
import {Sale} from "../../../models/sale";
import {SaleDetail} from "../../../models/saleDetail";
import {DiscountService} from "../../../../admin/services/discount/discount.service";
import {DiscountApiResponse} from "../../../../admin/models/apiResponses/discountApiResponse";
import {Discount} from "../../../../admin/models/discount";
import {PaymentMethod} from "../../../models/paymentMethod";

@Component({
  selector: 'app-sales-admin',
  templateUrl: './sales-admin.component.html',
  styleUrl: './sales-admin.component.css'
})
export class SalesAdminComponent implements OnInit {
    @Input() role: string;
    productName: string;
    step: string;
    disableInventoryInput: boolean;
    disablePaymentInput: boolean;
    newPaymentMethod: boolean;
    finalPrice: number;
    payedPrice: number;
    returnPrice: number;
    sale: Sale;
    paymentMethod: PaymentMethod;
    inventories: Array<Inventory>;
    discounts: Array<Discount>;

    constructor(private inventoryService: InventoryService, private snackBar: MatSnackBar,
                private discountService: DiscountService) {
        this.role = "";
        this.productName = "";
        this.step = '1';
        this.disableInventoryInput = false;
        this.disablePaymentInput = false;
        this.newPaymentMethod = false;
        this.finalPrice = 0;
        this.payedPrice = 0;
        this.returnPrice = 0;
        this.sale = { sede: "Molina Plaza" } as Sale;
        this.paymentMethod = { type: "Efectivo" } as PaymentMethod;
        this.sale.detail = [];
        this.sale.paymentMethod = [];
        this.inventories = [];
        this.discounts = [];
    }

    ngOnInit(): void {
        this.refreshInventoryMP();
        this.discountService.getAll().subscribe({
            next: (response: DiscountApiResponse) => {
                this.discounts = response.discounts;
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

    reloadSearch(searching: boolean) {
        if (!searching) {
            this.sale.detail = [];
        }
        this.productName = "";
        this.snackBar.open("Actualizando");
        if (this.sale.sede == "Molina Plaza") {
            this.refreshInventoryMP();
        } else {
            this.refreshInventoryOP();
        }
    }

    searchProduct() {
        if (this.productName != "") {
            this.snackBar.open("Buscando procuctos");
            if (this.sale.sede == "Molina Plaza") {
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

    selectProduct(inventory: Inventory) {
        let elementExisting = false;
        this.sale.detail.forEach(saleDetail => {
            if (saleDetail.product._id == inventory.product._id) {
                elementExisting = true;
            }
        });
        if (!elementExisting) {
            let saleDetail: SaleDetail = { product: inventory.product, quantity: 1, finalPrice: inventory.product.price, discount: 0, maxQuantity: inventory.quantity } as SaleDetail;
            this.sale.detail.push(saleDetail);
        }
    }

    deleteFromArray(index: number) {
        this.sale.detail.splice(index, 1);
    }

    updateFinalPrice(saleDetail: SaleDetail) {
        let price = saleDetail.quantity * saleDetail.product.price;
        price = price - price * saleDetail.discount * 0.01;
        saleDetail.finalPrice = Number(price.toFixed(2));
    }

    nextStep() {
        if (this.sale.detail.length != 0) {
            this.sale.detail.forEach(saleDetail => {
                this.finalPrice = this.finalPrice + saleDetail.finalPrice;
            });
            this.finalPrice = Number(this.finalPrice.toFixed(2));
            this.paymentMethod.amount = this.finalPrice;
            this.disableInventoryInput = true;
            this.step = '2';
        } else {
            this.snackBar.open("La venta esta vacia", "Entendido", {duration: 2000});
        }
    }

    addNewPaymentMethod() {
        this.sale.paymentMethod.push({ type: this.paymentMethod.type, amount: this.paymentMethod.amount });
        this.paymentMethod = {} as PaymentMethod;
        this.newPaymentMethod = true;
    }

    savePaymentMethods() {
        this.sale.paymentMethod.push({ type: this.paymentMethod.type, amount: this.paymentMethod.amount });
        this.disablePaymentInput = true;
        this.sale.paymentMethod.forEach(paymentMethod => {
            this.payedPrice = this.payedPrice + paymentMethod.amount;
        });
        let price = this.payedPrice - this.finalPrice;
        this.returnPrice = Number(price.toFixed(2));
    }

    createPayment() {
        if (this.payedPrice == 0) {
            this.snackBar.open("Confirma los metodos de pago", "Entendido", {duration: 2000});
        } else {
            this.snackBar.open("Creando pago", "Entendido", {duration: 2000});
            console.log(this.sale)
        }
    }
}
