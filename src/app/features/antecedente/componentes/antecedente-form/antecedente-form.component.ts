import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AntecedenteService } from '../../services/antecedente.service';
import { Antecedente } from '../../models/antecedente.model';
 

@Component({
  selector: 'app-antecedente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './antecedente-form.component.html',
  styleUrls: ['./antecedente-form.component.css']
})
export class AntecedenteFormComponent implements OnInit {
  antecedente: Antecedente = {
    id_af: 0,
    descripcion: '',
    tipo: 'FAMILIAR',
    id_historia: 0
  };
  isEdit = false;
  tipos = ['FAMILIAR', 'PERSONAL', 'QUIRURGICO', 'ALERGICO', 'OTRO'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private antecedenteService: AntecedenteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.antecedenteService.obtenerPorId(+id).subscribe({
        next: (data) => this.antecedente = data,
        error: () => this.router.navigate(['/antecedente'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.antecedenteService.actualizar(this.antecedente.id_af, this.antecedente)
      : this.antecedenteService.crear(this.antecedente);

    operacion.subscribe({
      next: () => this.router.navigate(['/antecedente']),
      error: (err) => console.error('Error guardando antecedente:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/antecedente']);
  }
}