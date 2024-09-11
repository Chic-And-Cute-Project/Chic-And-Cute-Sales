import {Sale} from "../sale";

export interface SaleApiResponse {
  sale: Sale;
  sales: Array<Sale>;
}
