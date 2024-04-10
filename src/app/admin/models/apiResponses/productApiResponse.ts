import {Product} from "../product";

export interface ProductApiResponse {
  product: Product;
  products: Array<Product>;
}
