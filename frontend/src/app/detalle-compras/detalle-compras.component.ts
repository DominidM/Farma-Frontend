import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DetalleCompra {
  id: number;
  id_compra: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

@Component({
  selector: 'app-detalle-compras',
  templateUrl: './detalle-compras.component.html',
  styleUrls: ['./detalle-compras.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DetalleComprasComponent {
  detalleCompras: DetalleCompra[] = [];
  detalleComprasMostrados: DetalleCompra[] = [];
  busqueda: string = '';
  cantidad: number = 10;
  pagina: number = 1;
  paginasTotales: number[] = [];

  constructor() {
    this.actualizarDetalleComprasMostrados();
  }

  filtrarDetalleCompras() {
    this.pagina = 1;
    this.actualizarDetalleComprasMostrados();
  }

  cambiarCantidad() {
    this.pagina = 1;
    this.actualizarDetalleComprasMostrados();
  }

  actualizarDetalleComprasMostrados() {
    let filtrados = this.detalleCompras.filter(dc =>
      dc.id_compra.toString().includes(this.busqueda) ||
      dc.id_producto.toString().includes(this.busqueda)
    );
    const total = Math.ceil(filtrados.length / this.cantidad) || 1;
    this.paginasTotales = Array.from({ length: total }, (_, i) => i + 1);
    this.detalleComprasMostrados = filtrados.slice((this.pagina - 1) * this.cantidad, this.pagina * this.cantidad);
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.actualizarDetalleComprasMostrados();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.paginasTotales.length) {
      this.pagina++;
      this.actualizarDetalleComprasMostrados();
    }
  }

  irAPagina(pag: number) {
    this.pagina = pag;
    this.actualizarDetalleComprasMostrados();
  }

  abrirModalNuevoDetalle() {
    // Aquí abres un modal para agregar detalle de compra
  }
}