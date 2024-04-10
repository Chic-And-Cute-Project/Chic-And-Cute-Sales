import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddProduct} from "../../models/dialogModels/add-product";

@Component({
    selector: 'app-add-user',
    templateUrl: './add-product-dialog.component.html',
    styleUrl: '../../pages/products-discounts/products-discounts.component.css'
})
export class AddProductDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<AddProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddProduct,
    ) {}

    close() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close({product: this.data.product});
    }
}
