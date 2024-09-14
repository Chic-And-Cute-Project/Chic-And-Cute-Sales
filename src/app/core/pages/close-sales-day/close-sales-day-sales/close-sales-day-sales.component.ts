import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-close-sales-day-sales',
  templateUrl: './close-sales-day-sales.component.html',
  styleUrl: './close-sales-day-sales.component.css'
})
export class CloseSalesDaySalesComponent {
    @Input() role: string;

    constructor() {
        this.role = "";
    }
}
