import {Inventory} from "../inventory";

export interface InventoryApiResponse {
  inventory: Inventory;
  inventories: Array<Inventory>;
}
