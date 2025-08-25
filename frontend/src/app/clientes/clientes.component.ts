import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  clientesMostrados: Cliente[] = [];
  busqueda: string = '';
  cantidad: number = 10;
  pagina: number = 1;
  paginasTotales: number[] = [];

  constructor() {
    this.actualizarClientesMostrados();
  }

  filtrarClientes() {
    this.pagina = 1;
    this.actualizarClientesMostrados();
  }

  cambiarCantidad() {
    this.pagina = 1;
    this.actualizarClientesMostrados();
  }

  actualizarClientesMostrados() {
    let clientesFiltrados = this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
    const total = Math.ceil(clientesFiltrados.length / this.cantidad) || 1;
    this.paginasTotales = Array.from({ length: total }, (_, i) => i + 1);
    this.clientesMostrados = clientesFiltrados.slice((this.pagina - 1) * this.cantidad, this.pagina * this.cantidad);
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.actualizarClientesMostrados();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.paginasTotales.length) {
      this.pagina++;
      this.actualizarClientesMostrados();
    }
  }

  irAPagina(pag: number) {
    this.pagina = pag;
    this.actualizarClientesMostrados();
  }

  abrirModalNuevoCliente() {
    // Aquí abres un modal para agregar cliente
  }
}