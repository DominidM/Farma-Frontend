import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Cliente { id: number; nombre: string; telefono: string; }
interface Empleado { id: number; nombre: string; }
interface Producto { id: number; nombre: string; precio_unitario: number; }
interface DetalleVenta {
  id_producto: number | null;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

@Component({
  selector: 'app-nueva-venta',
  standalone: true,
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class NuevaVentaComponent implements OnInit {
  // Autocomplete cliente
  clienteInput: string = '';
  mostrarSugerencias: boolean = false;
  clientesFiltrados: Cliente[] = [];

  // Para seleccionar o crear cliente
  clienteSeleccionado: Cliente | null = null;
  formNuevoCliente = false;
  nuevoCliente = { nombre: '', telefono: '' };

  // Datos base
  clientes: Cliente[] = [];
  empleados: Empleado[] = [];
  productos: Producto[] = [];

  venta = {
    id_cliente: null as number | null,
    id_empleado: null as number | null,
    fecha: this.getHoyISO(),
    total: 0
  };

  detalles: DetalleVenta[] = [];

  // Para gestión de pago y vuelto
  pagoCon: number = 0;
  vuelto: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    // Demo: deberías cargar desde tu API
    this.clientes = [
      { id: 1, nombre: 'Juan Pérez', telefono: '555-1234' },
      { id: 2, nombre: 'Ana López', telefono: '555-5678' }
    ];
    this.empleados = [
      { id: 1, nombre: 'Carlos Ruiz' },
      { id: 2, nombre: 'María Torres' }
    ];
    this.productos = [
      { id: 1, nombre: 'Paracetamol', precio_unitario: 10 },
      { id: 2, nombre: 'Ibuprofeno', precio_unitario: 15 }
    ];
    this.clientesFiltrados = this.clientes.slice();
    this.agregarDetalle();
  }

  getHoyISO(): string {
    const hoy = new Date();
    return hoy.toISOString().slice(0, 10);
  }

  // Autocomplete para clientes
  buscarClientes(query: string) {
    this.mostrarSugerencias = true;
    this.clientesFiltrados = this.clientes.filter(
      c => c.nombre.toLowerCase().includes(query.toLowerCase()) || c.telefono.includes(query)
    );
  }

  seleccionarCliente(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.clienteInput = cliente.nombre + ' (' + cliente.telefono + ')';
    this.venta.id_cliente = cliente.id;
    this.mostrarSugerencias = false;
  }

  abrirNuevoCliente() {
    this.formNuevoCliente = true;
    this.nuevoCliente = { nombre: '', telefono: '' };
    this.mostrarSugerencias = false;
  }

  cerrarNuevoCliente() {
    this.formNuevoCliente = false;
    this.nuevoCliente = { nombre: '', telefono: '' };
  }

  guardarNuevoCliente() {
    if (!this.nuevoCliente.nombre || !this.nuevoCliente.telefono) {
      alert('Completa nombre y teléfono.');
      return;
    }
    // Genera un id temporal, en tu app real debes pedirlo al backend
    const nuevoId = Math.max(...this.clientes.map(c => c.id), 0) + 1;
    const cliente: Cliente = {
      id: nuevoId,
      nombre: this.nuevoCliente.nombre,
      telefono: this.nuevoCliente.telefono
    };
    this.clientes.push(cliente);
    this.seleccionarCliente(cliente);
    this.cerrarNuevoCliente();
  }

  agregarDetalle() {
    this.detalles.push({
      id_producto: null,
      cantidad: 1,
      precio_unitario: 0,
      subtotal: 0
    });
  }

  eliminarDetalle(index: number) {
    this.detalles.splice(index, 1);
    this.actualizarTotal();
  }

  onProductoChange(index: number) {
    const detalle = this.detalles[index];
    const producto = this.productos.find(p => p.id === detalle.id_producto);
    if (producto) {
      detalle.precio_unitario = producto.precio_unitario;
      this.actualizarSubtotal(index);
    }
  }

  // Solo cantidad es editable, precio y subtotal son readonly
  actualizarSubtotal(index: number) {
    const detalle = this.detalles[index];
    detalle.subtotal = detalle.cantidad * detalle.precio_unitario;
    this.actualizarTotal();
    this.calcularVuelto();
  }

  actualizarTotal() {
    this.venta.total = this.detalles.reduce((sum, d) => sum + d.subtotal, 0);
    this.calcularVuelto();
  }

  // Sistema de cambio/vuelto
  calcularVuelto() {
    this.vuelto = Math.max(0, (this.pagoCon || 0) - (this.venta.total || 0));
  }

  detectarCodigoBarras() {
    alert('Función de lector de código de barras no implementada.');
  }

  guardarVenta() {
    // Validación
    if ((!this.venta.id_cliente && !this.clienteSeleccionado) || !this.venta.id_empleado || this.detalles.length === 0) {
      alert('Completa todos los datos de la venta.');
      return;
    }
    // Enviar venta y detalles a tu backend
    const ventaAEnviar = {
      ...this.venta,
      detalles: this.detalles,
      cliente: this.clienteSeleccionado,
      pagoCon: this.pagoCon,
      vuelto: this.vuelto
    };
    console.log('Venta guardada:', ventaAEnviar);

    // Limpiar formulario
    this.clienteSeleccionado = null;
    this.clienteInput = '';
    this.venta = {
      id_cliente: null,
      id_empleado: null,
      fecha: this.getHoyISO(),
      total: 0
    };
    this.detalles = [];
    this.pagoCon = 0;
    this.vuelto = 0;
    this.agregarDetalle();
  }
}