import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Venta {
  id: number;
  fecha: string;
  id_cliente: number;
  id_empleado: number;
  total: number;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VentasComponent {
  ventas: Venta[] = [];
  ventasMostradas: Venta[] = [];
  busqueda: string = '';
  cantidad: number = 10;
  pagina: number = 1;
  paginasTotales: number[] = [];

  constructor() {
    this.actualizarVentasMostradas();
  }

  filtrarVentas() {
    this.pagina = 1;
    this.actualizarVentasMostradas();
  }

  cambiarCantidad() {
    this.pagina = 1;
    this.actualizarVentasMostradas();
  }

  actualizarVentasMostradas() {
    let filtrados = this.ventas.filter(venta =>
      venta.id_cliente.toString().includes(this.busqueda) ||
      venta.id_empleado.toString().includes(this.busqueda)
    );
    const total = Math.ceil(filtrados.length / this.cantidad) || 1;
    this.paginasTotales = Array.from({ length: total }, (_, i) => i + 1);
    this.ventasMostradas = filtrados.slice((this.pagina - 1) * this.cantidad, this.pagina * this.cantidad);
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.actualizarVentasMostradas();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.paginasTotales.length) {
      this.pagina++;
      this.actualizarVentasMostradas();
    }
  }

  irAPagina(pag: number) {
    this.pagina = pag;
    this.actualizarVentasMostradas();
  }

  abrirModalNuevaVenta() {
    // Aquí abres un modal para agregar venta
  }
}