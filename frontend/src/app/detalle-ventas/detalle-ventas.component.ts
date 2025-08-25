import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DetalleVenta {
  id: number;
  id_venta: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DetalleVentasComponent {
  detalleVentas: DetalleVenta[] = [];
  detalleVentasMostrados: DetalleVenta[] = [];
  busqueda: string = '';
  cantidad: number = 10;
  pagina: number = 1;
  paginasTotales: number[] = [];

  constructor() {
    this.actualizarDetalleVentasMostrados();
  }

  filtrarDetalleVentas() {
    this.pagina = 1;
    this.actualizarDetalleVentasMostrados();
  }

  cambiarCantidad() {
    this.pagina = 1;
    this.actualizarDetalleVentasMostrados();
  }

  actualizarDetalleVentasMostrados() {
    let filtrados = this.detalleVentas.filter(dv =>
      dv.id_venta.toString().includes(this.busqueda) ||
      dv.id_producto.toString().includes(this.busqueda)
    );
    const total = Math.ceil(filtrados.length / this.cantidad) || 1;
    this.paginasTotales = Array.from({ length: total }, (_, i) => i + 1);
    this.detalleVentasMostrados = filtrados.slice((this.pagina - 1) * this.cantidad, this.pagina * this.cantidad);
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.actualizarDetalleVentasMostrados();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.paginasTotales.length) {
      this.pagina++;
      this.actualizarDetalleVentasMostrados();
    }
  }

  irAPagina(pag: number) {
    this.pagina = pag;
    this.actualizarDetalleVentasMostrados();
  }

  abrirModalNuevoDetalle() {
    // Aquí abres un modal para agregar detalle de venta
  }
}