import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-documents-principal',
  templateUrl: './documents-principal.component.html',
  styleUrl: './documents-principal.component.css'
})
export class DocumentsPrincipalComponent implements OnInit {
    role: string;

    constructor(private route: ActivatedRoute) {
        this.role = "";
    }

    ngOnInit(): void {
        this.role = this.route.snapshot.params['role'];
    }
}
