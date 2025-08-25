import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  codigo_barras: string;
  nombre: string;
  descripcion: string;
  precio_compra: number;
  precio_venta: number;
  stock: number;
  id_categoria: number;
  id_proveedor: number;
  fecha_caducidad: string; // formato ISO: '2025-08-25'
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductosComponent {
  productos: Producto[] = [];
  productosMostrados: Producto[] = [];
  busqueda: string = '';
  cantidad: number = 10;
  pagina: number = 1;
  paginasTotales: number[] = [];

  constructor() {
    this.actualizarProductosMostrados();
  }

  filtrarProductos() {
    this.pagina = 1;
    this.actualizarProductosMostrados();
  }

  cambiarCantidad() {
    this.pagina = 1;
    this.actualizarProductosMostrados();
  }

  actualizarProductosMostrados() {
    let filtrados = this.productos.filter(prod =>
      prod.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      prod.codigo_barras.toLowerCase().includes(this.busqueda.toLowerCase())
    );
    const total = Math.ceil(filtrados.length / this.cantidad) || 1;
    this.paginasTotales = Array.from({ length: total }, (_, i) => i + 1);
    this.productosMostrados = filtrados.slice((this.pagina - 1) * this.cantidad, this.pagina * this.cantidad);
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.actualizarProductosMostrados();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.paginasTotales.length) {
      this.pagina++;
      this.actualizarProductosMostrados();
    }
  }

  irAPagina(pag: number) {
    this.pagina = pag;
    this.actualizarProductosMostrados();
  }

  abrirModalNuevoProducto() {
    // Aquí abres un modal para agregar producto
  }
}