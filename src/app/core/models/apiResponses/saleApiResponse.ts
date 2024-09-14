import {Sale} from "../sale";
import {SaleReport} from "../saleReport";

export interface SaleApiResponse {
  sale: Sale;
  sales: Array<Sale>;
  salesReport: Array<SaleReport>;
}
