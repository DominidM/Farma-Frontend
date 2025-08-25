import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Compra {
  id: number;
  fecha: string;       // formato ISO: '2025-08-25', o como lo maneje tu backend
  id_proveedor: number;
  total: number;
}

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ComprasComponent {
  compras: Compra[] = [];
  comprasMostradas: Compra[] = [];
  busqueda: string = '';
  cantidad: number = 10;
  pagina: number = 1;
  paginasTotales: number[] = [];

  constructor() {
    this.actualizarComprasMostradas();
  }

  filtrarCompras() {
    this.pagina = 1;
    this.actualizarComprasMostradas();
  }

  cambiarCantidad() {
    this.pagina = 1;
    this.actualizarComprasMostradas();
  }

  actualizarComprasMostradas() {
    let comprasFiltradas = this.compras.filter(compra =>
      compra.id_proveedor.toString().includes(this.busqueda) // búsqueda por proveedor
      // Puedes agregar más criterios si lo deseas
    );
    const total = Math.ceil(comprasFiltradas.length / this.cantidad) || 1;
    this.paginasTotales = Array.from({ length: total }, (_, i) => i + 1);
    this.comprasMostradas = comprasFiltradas.slice((this.pagina - 1) * this.cantidad, this.pagina * this.cantidad);
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.actualizarComprasMostradas();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.paginasTotales.length) {
      this.pagina++;
      this.actualizarComprasMostradas();
    }
  }

  irAPagina(pag: number) {
    this.pagina = pag;
    this.actualizarComprasMostradas();
  }

  abrirModalNuevaCompra() {
    // Aquí abres un modal para agregar compra
  }
}