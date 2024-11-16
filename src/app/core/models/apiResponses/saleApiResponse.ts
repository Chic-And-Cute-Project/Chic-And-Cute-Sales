import {Sale} from "../sale";
import {SaleDetail} from "../saleDetail";

export interface SaleApiResponse {
  sale: Sale;
  sales: Array<Sale>;
  saleDetails: Array<SaleDetail>;
  cash: number;
  card: number;
  salesCount: number;
}
