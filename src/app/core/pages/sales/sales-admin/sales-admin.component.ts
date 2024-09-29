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
import {SaleService} from "../../../services/sale/sale.service";
import {Router} from "@angular/router";
import {lastValueFrom} from "rxjs";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {UserService} from "../../../services/user/user.service";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";

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
    disablePaymentTypeInput: boolean;
    disablePaymentInput: boolean;
    newPaymentMethod: boolean;
    finalPrice: number;
    payedPrice: number;
    returnPrice: number;
    sale: Sale;
    paymentMethod: PaymentMethod;
    paymentMethod2: PaymentMethod;
    inventories: Array<Inventory>;
    discounts: Array<Discount>;

    constructor(private inventoryService: InventoryService, private discountService: DiscountService,
                private saleService: SaleService, private userService: UserService,
                private communicationService: CommunicationService, private snackBar: MatSnackBar,
                private router: Router) {
        this.role = "";
        this.productName = "";
        this.step = '1';
        this.disableInventoryInput = false;
        this.disablePaymentTypeInput = false;
        this.disablePaymentInput = false;
        this.newPaymentMethod = false;
        this.finalPrice = 0;
        this.payedPrice = 0;
        this.returnPrice = 0;
        this.sale = { sede: "Molina Plaza" } as Sale;
        this.paymentMethod = { type: "Efectivo" } as PaymentMethod;
        this.paymentMethod2 = { type: "Visa", amount: 0 } as PaymentMethod;
        this.sale.detail = [];
        this.sale.paymentMethod = [];
        this.inventories = [];
        this.discounts = [];
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
        if (this.paymentMethod.amount < this.finalPrice) {
            if (this.paymentMethod.type != "Efectivo") {
                this.paymentMethod2.type = "Efectivo";
            }
            let price = this.finalPrice - this.paymentMethod.amount;
            this.paymentMethod2.amount = Number(price.toFixed(2));
            this.newPaymentMethod = true;
            this.disablePaymentTypeInput = true;
        } else {
            this.snackBar.open("El monto debe ser menor para agregar pago", "Entendido", {duration: 2000});
        }
    }

    savePaymentMethods() {
        let totalPrice: number = this.paymentMethod.amount + this.paymentMethod2.amount;
        if (totalPrice > this.finalPrice) {
            if (this.newPaymentMethod) {
                this.snackBar.open("Colocar monto exacto", "Entendido", {duration: 2000});
            } else {
                if (this.paymentMethod.type == "Efectivo") {
                    this.paymentMethod.amount = this.finalPrice;
                    this.sale.paymentMethod.push(this.paymentMethod);

                    this.disablePaymentTypeInput = true;
                    this.disablePaymentInput = true;
                    this.payedPrice = totalPrice;
                    let price = this.payedPrice - this.finalPrice;
                    this.returnPrice = Number(price.toFixed(2));
                } else {
                    this.snackBar.open("Colocar monto exacto", "Entendido", {duration: 2000});
                }
            }
        } else if (totalPrice == this.finalPrice) {
            this.sale.paymentMethod.push(this.paymentMethod);
            if (this.newPaymentMethod) {
                this.sale.paymentMethod.push(this.paymentMethod2);
            }
            this.disablePaymentTypeInput = true;
            this.disablePaymentInput = true;
            this.payedPrice = totalPrice;
            let price = this.payedPrice - this.finalPrice;
            this.returnPrice = Number(price.toFixed(2));
        } else {
            this.snackBar.open("Montos insuficientes", "Entendido", {duration: 2000});
        }
    }

    createPayment() {
        if (this.payedPrice == 0) {
            this.snackBar.open("Confirma los metodos de pago", "Entendido", {duration: 2000});
        } else {
            this.snackBar.open("Creando pago", "Entendido", {duration: 2000});
            this.saleService.create(this.sale).subscribe({
                next: async () => {
                    this.snackBar.open("Actualizando inventarios");
                    for (let saleDetail of this.sale.detail) {
                        let inventory = this.inventories.find(inventory => inventory.product._id === saleDetail.product._id);

                        if (inventory) {
                            inventory.quantity = inventory.quantity - saleDetail.quantity;
                            const updateInventoryToPromise = this.inventoryService.update(inventory._id, inventory);
                            await lastValueFrom(updateInventoryToPromise);
                        }
                    }
                    this.snackBar.dismiss();
                    this.router.navigate(['/home', this.role]).then();
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
        }
    }
}
