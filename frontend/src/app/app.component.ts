import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component'; // IMPORTA tu sidebar

@Component({
  selector: 'app-root',
  standalone: true,                // Asegura que sea standalone (si lo es)
  imports: [RouterOutlet, SidebarComponent], // Agrega SidebarComponent aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}