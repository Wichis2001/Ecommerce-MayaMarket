import { Component, OnInit } from '@angular/core';
import { SeguimientoPedido } from '../../interfaces/seguimiento-pedido.interface';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styles: [
  ]
})
export class OrderPageComponent implements OnInit{

  constructor( private ventasService: VentaService ) {}
  ngOnInit(): void {
    this.ventasService.getOrdenes().subscribe( orden => this.pedidos = orden );
  }
  pedidos!: SeguimientoPedido[];
  columnas: string[] = ['No.', 'Estado', 'Productos', 'Fecha Entrega'];



}
