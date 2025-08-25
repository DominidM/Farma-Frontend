import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'main' },
      { path: 'main', loadComponent: () => import('./main/main.component').then(m => m.MainComponent) },
      { path: 'atencion', loadComponent: () => import('./atencion/atencion.component').then(m => m.AtencionComponent) },
      // Historiales
      { path: 'ventas_historial', loadChildren: () => import('../ventas/ventas.routes').then(m => m.VENTAS_ROUTES) },
      { path: 'compras_historial', loadChildren: () => import('../compras/compras.routes').then(m => m.COMPRAS_ROUTES) },
      // Gestión (CRUDs)
      {
        path: 'gestion',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'categorias' },
          { path: 'categorias', loadChildren: () => import('../categorias/categorias.routes').then(m => m.CATEGORIAS_ROUTES) },
          { path: 'clientes', loadChildren: () => import('../clientes/clientes.routes').then(m => m.CLIENTES_ROUTES) },
          { path: 'compras', loadChildren: () => import('../compras/compras.routes').then(m => m.COMPRAS_ROUTES) },
          { path: 'detalle-compras', loadChildren: () => import('../detalle-compras/detalle-compras.routes').then(m => m.DETALLE_COMPRAS_ROUTES) },
          { path: 'detalle-ventas', loadChildren: () => import('../detalle-ventas/detalle-ventas.routes').then(m => m.DETALLE_VENTAS_ROUTES) },
          { path: 'empleados', loadChildren: () => import('../empleados/empleados.routes').then(m => m.EMPLEADOS_ROUTES) },
          { path: 'productos', loadChildren: () => import('../productos/productos.routes').then(m => m.PRODUCTOS_ROUTES) },
          { path: 'proveedores', loadChildren: () => import('../proveedores/proveedores.routes').then(m => m.PROVEEDORES_ROUTES) },
          { path: 'ventas', loadChildren: () => import('../ventas/ventas.routes').then(m => m.VENTAS_ROUTES) }
        ]
      },
      // Acciones rápidas
      { path: 'nueva_venta', loadComponent: () => import('./nueva-venta/nueva-venta.component').then(m => m.NuevaVentaComponent) },
      { path: 'nueva_compra', loadComponent: () => import('./nueva-compra/nueva-compra.component').then(m => m.NuevaCompraComponent) },
    ]
  }
];