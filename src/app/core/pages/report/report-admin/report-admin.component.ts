import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrl: './report-admin.component.css'
})
export class ReportAdminComponent {
    @Input() role: string;

    constructor() {
        this.role = "";
    }


}
