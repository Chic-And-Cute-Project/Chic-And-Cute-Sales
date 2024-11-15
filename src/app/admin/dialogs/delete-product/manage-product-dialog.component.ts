import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ManageProduct} from "../../models/dialogModels/manage-product";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-delete-product',
    templateUrl: './manage-product-dialog.component.html',
    styleUrl: '../../pages/products-discounts/products-discounts.component.css'
})
export class ManageProductDialogComponent {
    validator: boolean;

    constructor(
        public dialogRef: MatDialogRef<ManageProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ManageProduct,
        private snackBar: MatSnackBar
    ) {
        this.validator = false;
    }

    close() {
        this.dialogRef.close();
    }

    saveUpdate() {
        this.dialogRef.close({manageType: "Update", product: this.data.product});
    }

    saveDelete() {
        if (this.validator) {
            this.dialogRef.close({manageType: "Delete", product: this.data.product});
        } else {
            this.snackBar.open("Seleccionar la casilla para eliminar", "Entendido", {duration: 5000});
        }
    }
}
