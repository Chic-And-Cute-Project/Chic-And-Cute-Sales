import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-stock-reception-principal',
  templateUrl: './stock-reception-principal.component.html',
  styleUrl: './stock-reception-principal.component.css'
})
export class StockReceptionPrincipalComponent implements OnInit{
    role: string;

    constructor(private route: ActivatedRoute) {
        this.role = "";
    }

    ngOnInit(): void {
        this.role = this.route.snapshot.params['role'];
    }
}
