import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeleteProduct} from "../../models/dialogModels/delete-product";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-delete-product',
    templateUrl: './delete-product-dialog.component.html',
    styleUrl: '../../pages/products-discounts/products-discounts.component.css'
})
export class DeleteProductDialogComponent {
    validator: boolean;

    constructor(
        public dialogRef: MatDialogRef<DeleteProductDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DeleteProduct,
        private snackBar: MatSnackBar
    ) {
        this.validator = false;
    }

    close() {
        this.dialogRef.close();
    }

    save() {
        if (this.validator) {
            this.dialogRef.close({product: this.data.product});
        } else {
            this.snackBar.open("Seleccionar la casilla para eliminar", "Entendido", {duration: 5000});
        }
    }
}
