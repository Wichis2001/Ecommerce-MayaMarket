import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/user.interface';

@Component({
  selector: 'app-agregar-confirm',
  templateUrl: './agregar-confirm.component.html',
  styles: [
  ]
})
export class AgregarConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<AgregarConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void {
    this.dialogRef.close(true)
  }
}
