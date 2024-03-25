import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Producto } from '../../interfaces/producto.intarface';
import { ProductoService } from '../../services/producto.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [` `]
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public productos: Producto[] = [];
  public selectedProducto?: Producto;

  constructor( private productosService: ProductoService ){}

  searchProducto() {
    const value: string = this.searchInput.value || '';

    this.productosService.getSuggestions( value )
      .subscribe( productos => this.productos = productos );
  }


  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.selectedProducto = undefined;
      return;
    }

    const producto: Producto = event.option.value;
    this.searchInput.setValue( producto.nombre );

    this.selectedProducto = producto;

  }
}
