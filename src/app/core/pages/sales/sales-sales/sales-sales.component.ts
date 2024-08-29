import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sales-sales',
  templateUrl: './sales-sales.component.html',
  styleUrl: './sales-sales.component.css'
})
export class SalesSalesComponent {
    @Input() role: string;

    constructor() {
        this.role = "";
    }
}
