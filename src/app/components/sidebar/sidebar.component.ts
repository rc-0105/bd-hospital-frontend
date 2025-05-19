import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isOpen = false;
  
  groups: {[key: string]: boolean} = {
    medica: true,    // Grupo médico abierto por defecto
    servicios: false,
    admin: false,
    facturacion: false,
    seguros: false,
    reclamos: false,
    config: false
  };

  toggleGroup(group: string) {
    // Cierra todos los grupos excepto el que se está tocando
    if (!this.groups[group]) {
      for (const key in this.groups) {
        this.groups[key] = false;
      }
    }
    this.groups[group] = !this.groups[group];
  }

  closeSidebarOnMobile() {
    // Cierra el sidebar en dispositivos móviles al hacer clic en un enlace
    if (window.innerWidth < 992) {
      this.isOpen = false;
    }
  }
}