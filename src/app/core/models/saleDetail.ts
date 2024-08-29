import {Product} from "../../admin/models/product";

export interface SaleDetail {
    product: Product;
    quantity: number;
    discount: number;
    finalPrice: number;
}
