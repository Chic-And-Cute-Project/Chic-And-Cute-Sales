import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EditInventory} from "../../models/dialogModels/edit-inventory";

@Component({
    selector: 'app-edit-inventory',
    templateUrl: './edit-inventory-dialog.component.html',
    styleUrl: '../../pages/stock/stock-admin/stock-admin.component.css'
})
export class EditInventoryDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<EditInventoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditInventory,
    ) {}

    close() {
        this.dialogRef.close();
    }

    save() {
        this.dialogRef.close({inventory: this.data.inventory});
    }
}
