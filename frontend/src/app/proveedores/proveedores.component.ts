import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
}

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProveedoresComponent {
  proveedores: Proveedor[] = [];
  proveedoresMostrados: Proveedor[] = [];
  busqueda: string = '';
  cantidad: number = 10;
  pagina: number = 1;
  paginasTotales: number[] = [];

  constructor() {
    this.actualizarProveedoresMostrados();
  }

  filtrarProveedores() {
    this.pagina = 1;
    this.actualizarProveedoresMostrados();
  }

  cambiarCantidad() {
    this.pagina = 1;
    this.actualizarProveedoresMostrados();
  }

  actualizarProveedoresMostrados() {
    let filtrados = this.proveedores.filter(prov =>
      prov.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      prov.telefono.includes(this.busqueda) ||
      prov.direccion.toLowerCase().includes(this.busqueda.toLowerCase())
    );
    const total = Math.ceil(filtrados.length / this.cantidad) || 1;
    this.paginasTotales = Array.from({ length: total }, (_, i) => i + 1);
    this.proveedoresMostrados = filtrados.slice((this.pagina - 1) * this.cantidad, this.pagina * this.cantidad);
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.actualizarProveedoresMostrados();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.paginasTotales.length) {
      this.pagina++;
      this.actualizarProveedoresMostrados();
    }
  }

  irAPagina(pag: number) {
    this.pagina = pag;
    this.actualizarProveedoresMostrados();
  }

  abrirModalNuevoProveedor() {
    // Aquí abres un modal para agregar proveedor
  }
}