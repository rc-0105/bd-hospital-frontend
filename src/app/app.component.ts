import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Asegúrate de que sea templateUrl
  imports: [RouterOutlet, SidebarComponent,NavbarComponent],
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bd_hospital_managment';
  sidebarOpen = false;

  onToggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
 
}