import { Routes } from '@angular/router';
// Importa tu componente principal de categorías
import { ProductosComponent } from './productos.component';

export const PRODUCTOS_ROUTES: Routes = [
  { path: '', component: ProductosComponent  }
];