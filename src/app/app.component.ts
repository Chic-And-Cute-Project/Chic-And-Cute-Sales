import {ChangeDetectorRef, Component} from '@angular/core';
import {Subscription} from "rxjs";
import {CommunicationService} from "./shared/services/communicacion/communication.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    name: string;
    sede: string;
    titleChangedSubscription: Subscription;

    constructor(private communicationService: CommunicationService, private cdr: ChangeDetectorRef) {
        this.name = "";
        this.sede = "";
        this.titleChangedSubscription = this.communicationService.titleChanged.subscribe((value) => {
            this.name = value.name;
            this.sede = value.sede;
            this.cdr.detectChanges();
        });
    }
}
