import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Empleado {
  id: number;
  usuario: string;
  nombre: string;
}

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EmpleadosComponent {
  empleados: Empleado[] = [];
  empleadosMostrados: Empleado[] = [];
  busqueda: string = '';
  cantidad: number = 10;
  pagina: number = 1;
  paginasTotales: number[] = [];

  constructor() {
    this.actualizarEmpleadosMostrados();
  }

  filtrarEmpleados() {
    this.pagina = 1;
    this.actualizarEmpleadosMostrados();
  }

  cambiarCantidad() {
    this.pagina = 1;
    this.actualizarEmpleadosMostrados();
  }

  actualizarEmpleadosMostrados() {
    let filtrados = this.empleados.filter(emp =>
      emp.usuario.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      emp.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
    const total = Math.ceil(filtrados.length / this.cantidad) || 1;
    this.paginasTotales = Array.from({ length: total }, (_, i) => i + 1);
    this.empleadosMostrados = filtrados.slice((this.pagina - 1) * this.cantidad, this.pagina * this.cantidad);
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.actualizarEmpleadosMostrados();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.paginasTotales.length) {
      this.pagina++;
      this.actualizarEmpleadosMostrados();
    }
  }

  irAPagina(pag: number) {
    this.pagina = pag;
    this.actualizarEmpleadosMostrados();
  }

  abrirModalNuevoEmpleado() {
    // Aquí abres un modal para agregar empleado
  }
}