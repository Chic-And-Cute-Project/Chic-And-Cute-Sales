import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-sales-principal',
    templateUrl: './sales-principal.component.html',
    styleUrl: './sales-principal.component.css'
})
export class SalesPrincipalComponent implements OnInit {
    role: string;

    constructor(private route: ActivatedRoute) {
        this.role = "";
    }

    ngOnInit(): void {
        this.role = this.route.snapshot.params['role'];
    }
}
