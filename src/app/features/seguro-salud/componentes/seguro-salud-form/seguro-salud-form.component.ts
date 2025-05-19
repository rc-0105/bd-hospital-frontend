import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SeguroSaludService } from '../../services/seguro-salud.service';
import { SeguroSalud } from '../../models/seguro-salud.model';
 
@Component({
  selector: 'app-seguro-salud-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './seguro-salud-form.component.html',
  styleUrls: ['./seguro-salud-form.component.css']
})
export class SeguroSaludFormComponent implements OnInit {
  seguro: SeguroSalud = {} as SeguroSalud;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seguroService: SeguroSaludService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.seguroService.obtenerPorId(+id).subscribe({
        next: (data) => this.seguro = data,
        error: () => this.router.navigate(['/seguro-salud'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.seguroService.actualizar(this.seguro.id_seguro, this.seguro)
      : this.seguroService.crear(this.seguro);

    operacion.subscribe({
      next: (msg) => {
        alert(msg);
        this.router.navigate(['/seguro-salud']);
      },
      error: (err) => console.error('Error guardando seguro:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/seguro-salud']);
  }
}