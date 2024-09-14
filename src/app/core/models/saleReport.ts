import {Product} from "../../admin/models/product";

export interface SaleReport {
    product: Product;
    quantity: number;
}
