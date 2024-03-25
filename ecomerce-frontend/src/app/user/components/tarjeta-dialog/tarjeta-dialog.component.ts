import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tarjeta-dialog',
  templateUrl: './tarjeta-dialog.component.html',
  styles: [
  ]
})
export class TarjetaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TarjetaDialogComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void {
    this.dialogRef.close(true)
  }

}
