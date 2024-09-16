import {User} from "../../security/models/user";
import {Sale} from "./sale";

export interface CloseSalesDay {
    _id: string;
    sede: string;
    user: User;
    date: Date;
    sales: Array<Sale>;
    cashAmount: number;
    cardAmount: number;

    totalAmount: number;
    show: boolean;
}
