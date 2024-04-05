import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-home-principal',
    templateUrl: './home-principal.component.html',
    styleUrl: './home-principal.component.css'
})
export class HomePrincipalComponent implements OnInit{
    role: string;

    constructor(private route: ActivatedRoute) {
        this.role = "";
    }

    ngOnInit(): void {
        this.role = this.route.snapshot.params['role'];
    }

}
