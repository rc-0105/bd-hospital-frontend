import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipoAreaService } from '../../services/tipo-area.service';
import { TipoArea } from '../../models/tipo-area.model';
 

@Component({
  selector: 'app-tipo-area-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tipo-area-form.component.html',
  styleUrls: ['./tipo-area-form.component.css']
})
export class TipoAreaFormComponent implements OnInit {
  tipoArea: TipoArea = {
    id_tparea: 0,
    tipo: ''
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoAreaService: TipoAreaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tipoAreaService.obtenerPorId(+id).subscribe({
        next: (data) => this.tipoArea = data,
        error: () => this.router.navigate(['/tipoarea'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.tipoAreaService.actualizar(this.tipoArea.id_tparea, this.tipoArea)
      : this.tipoAreaService.crear(this.tipoArea);

    operacion.subscribe({
      next: () => this.router.navigate(['/tipoarea']),
      error: (err) => console.error('Error guardando tipo de área:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/tipoarea']);
  }
}