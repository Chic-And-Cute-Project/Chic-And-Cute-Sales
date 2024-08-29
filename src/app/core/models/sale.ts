import {SaleDetail} from "./saleDetail";
import {User} from "../../security/models/user";
import {PaymentMethod} from "./paymentMethod";

export interface Sale {
    _id: string;
    sede: string;
    user: User;
    date: Date;
    detail: Array<SaleDetail>;
    paymentMethod: Array<PaymentMethod>;
}
