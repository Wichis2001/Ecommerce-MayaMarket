import { Component, OnInit } from '@angular/core';
import { Reporte } from '../../interfaces/reportes.interface';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-clientes-mas-productos-en-venta',
  templateUrl: './clientes-mas-productos-en-venta.component.html',
  styles: [
  ]
})
export class ClientesMasProductosEnVentaComponent implements OnInit{

  columnas: string[] = ['No.', 'Nombre Cliente', 'Productos en Venta'];
  reportes: Reporte[] = [];

  constructor( private reports: ReportsService) {}

  ngOnInit(): void {
    this.reports.get10ClientesProductosTienenVenta().subscribe( res => {
      this.reportes = res;
    });
  }

}
