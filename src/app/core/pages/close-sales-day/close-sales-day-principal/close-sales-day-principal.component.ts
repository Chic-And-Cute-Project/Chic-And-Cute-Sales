import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-close-sales-day-principal',
  templateUrl: './close-sales-day-principal.component.html',
  styleUrl: './close-sales-day-principal.component.css'
})
export class CloseSalesDayPrincipalComponent implements OnInit {
    role: string;

    constructor(private route: ActivatedRoute) {
        this.role = "";
    }

    ngOnInit(): void {
        this.role = this.route.snapshot.params['role'];
    }
}
