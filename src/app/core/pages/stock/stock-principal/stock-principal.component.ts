import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-stock-principal',
    templateUrl: './stock-principal.component.html',
    styleUrl: './stock-principal.component.css'
})
export class StockPrincipalComponent implements OnInit{
    role: string;

    constructor(private route: ActivatedRoute) {
        this.role = "";
    }

    ngOnInit(): void {
        this.role = this.route.snapshot.params['role'];
    }
}
