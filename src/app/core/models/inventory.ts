import {Product} from "../../admin/models/product";

export interface Inventory {
    _id: string;
    sede: string;
    product: Product;
    quantity: number;
}
