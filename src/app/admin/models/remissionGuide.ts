import {RemissionGuideItem} from "./remissionGuideItem";

export interface RemissionGuide {
    _id: string;
    date: Date;
    sedeFrom: string;
    sedeTo: string;
    products: Array<RemissionGuideItem>;
    status: string;
    identifier: string;
}
