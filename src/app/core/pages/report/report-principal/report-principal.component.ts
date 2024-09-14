import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-report-principal',
  templateUrl: './report-principal.component.html',
  styleUrl: './report-principal.component.css'
})
export class ReportPrincipalComponent implements OnInit {
    role: string;

    constructor(private route: ActivatedRoute) {
        this.role = "";
    }

    ngOnInit(): void {
        this.role = this.route.snapshot.params['role'];
    }
}
