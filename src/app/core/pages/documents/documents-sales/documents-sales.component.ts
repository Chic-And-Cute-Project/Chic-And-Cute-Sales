import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-documents-sales',
  templateUrl: './documents-sales.component.html',
  styleUrl: './documents-sales.component.css'
})
export class DocumentsSalesComponent {
    @Input() role: string;

    constructor() {
        this.role = "";
    }
}
