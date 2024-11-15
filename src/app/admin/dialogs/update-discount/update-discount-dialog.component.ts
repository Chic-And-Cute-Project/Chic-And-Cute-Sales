import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddDiscount} from "../../models/dialogModels/add-discount";

@Component({
    selector: 'app-update-discount',
    templateUrl: './update-discount-dialog.component.html',
    styleUrl: '../../pages/products-discounts/products-discounts.component.css'
})
export class UpdateDiscountDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<UpdateDiscountDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddDiscount,
    ) {}

    close() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close({discount: this.data.discount});
    }
}
