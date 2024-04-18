import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-coin-dialog',
  templateUrl: './coin-dialog.component.html',
  styles: [
  ]
})
export class CoinDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CoinDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje:string
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm():void {
    this.dialogRef.close(true)
  }
}
