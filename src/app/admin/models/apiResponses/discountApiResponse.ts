import {Discount} from "../discount";

export interface DiscountApiResponse {
  discount: Discount;
  discounts: Array<Discount>;
}
