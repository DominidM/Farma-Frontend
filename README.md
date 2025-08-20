# Farma-Frontend

Frontend web para el sistema de farmacia, desarrollado con **Angular 19**.

## Funcionalidades principales

- Interfaz intuitiva para gestión de productos, ventas, compras y reportes
- Búsqueda y registro de productos mediante **lectura de código de barras**
  - Opción de escanear con lector físico (USB) o cámara del dispositivo
- Gestión de usuarios y roles (cajero, administrador)
- Visualización y control de inventario en tiempo real
- Integración completa con el backend Spring Boot

## Tecnologías utilizadas

- Angular 19
- TypeScript
- RxJS
- Bootstrap (o Material UI, según prefieras)
- Librerías de escaneo de código de barras: 
  - [@zxing/browser](https://www.npmjs.com/package/@zxing/browser) (para cámara)
  - Compatibilidad con lectores físicos de código de barras (input de texto)

## Requisitos

- Node.js 18+
- Angular CLI

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/Farma-Frontend.git
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

4. Accede a la app en [http://localhost:4200](http://localhost:4200)

## Características destacadas

- **Modo de escaneo dual**: El usuario puede seleccionar entre lector físico o escaneo por cámara para facilitar la venta rápida de productos.
- **Responsive**: Optimizado para computadoras, tablets y móviles.
- **Integración segura**: Comunicación con API REST backend mediante JWT (recomendado).

## Notas

- Configura la URL del backend en `src/environments/environment.ts`.
- Para el escaneo con cámara, es necesario dar permisos al navegador.
- Si usas un lector físico, basta con enfocar el input de código de barras.
