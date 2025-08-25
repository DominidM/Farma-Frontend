import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Categoria {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CategoriasComponent {
  categorias: Categoria[] = [];
  categoriasMostradas: Categoria[] = [];
  busqueda: string = '';
  cantidad: number = 10;
  pagina: number = 1;
  paginasTotales: number[] = [];

  constructor() {
    this.actualizarCategoriasMostradas();
  }

  filtrarCategorias() {
    this.pagina = 1;
    this.actualizarCategoriasMostradas();
  }

  cambiarCantidad() {
    this.pagina = 1;
    this.actualizarCategoriasMostradas();
  }

  actualizarCategoriasMostradas() {
    let cats = this.categorias.filter(cat =>
      cat.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
    const total = Math.ceil(cats.length / this.cantidad) || 1;
    this.paginasTotales = Array.from({ length: total }, (_, i) => i + 1);
    this.categoriasMostradas = cats.slice((this.pagina - 1) * this.cantidad, this.pagina * this.cantidad);
  }

  paginaAnterior() {
    if (this.pagina > 1) {
      this.pagina--;
      this.actualizarCategoriasMostradas();
    }
  }

  paginaSiguiente() {
    if (this.pagina < this.paginasTotales.length) {
      this.pagina++;
      this.actualizarCategoriasMostradas();
    }
  }

  irAPagina(pag: number) {
    this.pagina = pag;
    this.actualizarCategoriasMostradas();
  }

  abrirModalNuevaCategoria() {
    // Aquí abres un modal para agregar categoría
  }
}