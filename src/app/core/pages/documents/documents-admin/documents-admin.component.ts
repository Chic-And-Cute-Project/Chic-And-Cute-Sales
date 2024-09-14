import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-documents-admin',
  templateUrl: './documents-admin.component.html',
  styleUrl: './documents-admin.component.css'
})
export class DocumentsAdminComponent {
    @Input() role: string;

    constructor() {
        this.role = "";
    }
}
