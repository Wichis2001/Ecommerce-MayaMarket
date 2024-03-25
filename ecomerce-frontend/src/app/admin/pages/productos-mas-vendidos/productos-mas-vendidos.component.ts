import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RangoFechas, Reporte } from '../../interfaces/reportes.interface';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-productos-mas-vendidos',
  templateUrl: './productos-mas-vendidos.component.html',
  styles: [
  ]
})
export class ProductosMasVendidosComponent implements OnInit {

  miFormulario!: FormGroup;
  columnas: string[] = ['No.', 'Nombre Producto', 'Cantidad Ventas'];
  reportes: Reporte[] = [];

  constructor(private fb: FormBuilder,
              private reports: ReportsService) {}

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required]
    }, {
      validators: [this.validateDateRange, this.validateMaxDate]
    });
  }

  validateDateRange(form: FormGroup): ValidationErrors | null {
    const fechaInicioControl = form.get('fechaInicio');
    const fechaFinControl = form.get('fechaFin');

    if (fechaInicioControl?.value && fechaFinControl?.value) {
      if (fechaInicioControl.value > fechaFinControl.value) {
        fechaInicioControl.setErrors({ dateRangeInvalid: true });
        fechaFinControl.setErrors({ dateRangeInvalid: true });
        return { dateRangeInvalid: true };
      } else {
        fechaInicioControl.setErrors(null);
        fechaFinControl.setErrors(null);
        return null;
      }
    }

    return null;
  }

  validateMaxDate(form: FormGroup) {
    const endDate = form.get('fechaFin')?.value;
    const today = new Date();

    if (endDate && endDate > today) {
      form.get('fechaFin')?.setErrors({ maxDateExceeded: true });
    } else {
      form.get('fechaFin')?.setErrors(null);
    }
  }

  get currentFechas(): RangoFechas {
    const fechas = this.miFormulario.value as RangoFechas;
    return fechas;
  }

  getProducto(){
    this.reports.getProductosMasVendidos( this.currentFechas ).subscribe( res => {
      this.reportes = res;
    });
  }
}
