import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddImage} from "../models/dialogModels/add-user";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user-dialog.component.html',
    styleUrl: '../pages/sales-sede/sales-sede.component.css'
})
export class AddUserDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<AddUserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddImage,
    ) {}

    close() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close({user: this.data.user});

    }
}
