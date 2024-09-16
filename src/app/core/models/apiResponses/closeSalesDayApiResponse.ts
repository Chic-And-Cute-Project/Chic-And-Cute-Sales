import {CloseSalesDay} from "../close-sales-day";

export interface CloseSalesDayApiResponse {
  closeSalesDay: CloseSalesDay;
  closeSalesDays: Array<CloseSalesDay>;
}
