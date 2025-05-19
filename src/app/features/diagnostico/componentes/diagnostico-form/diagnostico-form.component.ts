import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { Diagnostico } from '../../models/diagnostico.model';
 

@Component({
  selector: 'app-diagnostico-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './diagnostico-form.component.html',
  styleUrls: ['./diagnostico-form.component.css']
})
export class DiagnosticoFormComponent implements OnInit {
  diagnostico: Diagnostico = {} as Diagnostico;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diagnosticoService: DiagnosticoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.diagnosticoService.obtenerPorId(+id).subscribe({
        next: (data) => this.diagnostico = data,
        error: () => this.router.navigate(['/diagnostico'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.diagnosticoService.actualizar(this.diagnostico.id_diagnostico, this.diagnostico)
      : this.diagnosticoService.crear(this.diagnostico);

    operacion.subscribe({
      next: () => this.router.navigate(['/diagnostico']),
      error: (err) => console.error('Error guardando diagnóstico:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/diagnostico']);
  }
}