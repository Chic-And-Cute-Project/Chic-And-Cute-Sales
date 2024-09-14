import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-close-sales-day-admin',
  templateUrl: './close-sales-day-admin.component.html',
  styleUrl: './close-sales-day-admin.component.css'
})
export class CloseSalesDayAdminComponent {
    @Input() role: string;

    constructor() {
        this.role = "";
    }
}
