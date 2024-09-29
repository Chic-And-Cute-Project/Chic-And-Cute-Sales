import {Component, Input, OnInit} from '@angular/core';
import {Sale} from "../../../models/sale";
import {PaymentMethod} from "../../../models/paymentMethod";
import {Inventory} from "../../../models/inventory";
import {Discount} from "../../../../admin/models/discount";
import {InventoryService} from "../../../services/inventory/inventory.service";
import {DiscountService} from "../../../../admin/services/discount/discount.service";
import {SaleService} from "../../../services/sale/sale.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DiscountApiResponse} from "../../../../admin/models/apiResponses/discountApiResponse";
import {InventoryApiResponse} from "../../../models/apiResponses/inventoryApiResponse";
import {SaleDetail} from "../../../models/saleDetail";
import {UserService} from "../../../services/user/user.service";
import {UserApiResponse} from "../../../../security/models/apiResponses/userApiResponse";
import {lastValueFrom} from "rxjs";
import {CommunicationService} from "../../../../shared/services/communicacion/communication.service";

@Component({
  selector: 'app-sales-sales',
  templateUrl: './sales-sales.component.html',
  styleUrl: './sales-sales.component.css'
})
export class SalesSalesComponent implements OnInit {
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
    paymentMethod2: PaymentMethod;
    inventories: Array<Inventory>;
    discounts: Array<Discount>;

    constructor(private inventoryService: InventoryService, private discountService: DiscountService,
                private userService: UserService, private saleService: SaleService,
                private communicationService: CommunicationService, private snackBar: MatSnackBar,
                private router: Router) {
        this.role = "";
        this.productName = "";
        this.step = '1';
        this.disableInventoryInput = false;
        this.disablePaymentInput = false;
        this.newPaymentMethod = false;
        this.finalPrice = 0;
        this.payedPrice = 0;
        this.returnPrice = 0;
        this.sale = {} as Sale;
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
                    this.sale.sede = response.user.sede;
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
        this.refreshInventories();
        this.discountService.getAll().subscribe({
            next: (response: DiscountApiResponse) => {
                this.discounts = response.discounts;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    refreshInventories() {
        this.inventoryService.getByMySede().subscribe({
            next: (response: InventoryApiResponse) => {
                this.snackBar.dismiss();
                this.inventories = response.inventories;
            },
            error: (e) => {
                this.snackBar.open(e.message, "Entendido", {duration: 2000});
            }
        });
    }

    reloadSearch() {
        this.productName = "";
        this.snackBar.open("Actualizando");
        this.refreshInventories();
    }

    searchProduct() {
        if (this.productName != "") {
            this.snackBar.open("Buscando procuctos");
            this.inventoryService.searchMyProducts(this.productName).subscribe({
                next: (response: InventoryApiResponse) => {
                    this.snackBar.dismiss();
                    this.inventories = response.inventories;
                },
                error: (e) => {
                    this.snackBar.open(e.message, "Entendido", {duration: 2000});
                }
            });
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
        if (this.paymentMethod.type != "Efectivo") {
            this.paymentMethod2.type = "Efectivo";
        }
        this.newPaymentMethod = true;
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
