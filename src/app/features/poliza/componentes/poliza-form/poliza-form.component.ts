import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PolizaService } from '../../services/poliza.service';
import { Poliza } from '../../models/poliza.model';
 

@Component({
  selector: 'app-poliza-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './poliza-form.component.html',
  styleUrls: ['./poliza-form.component.css']
})
export class PolizaFormComponent implements OnInit {
  poliza: Poliza = {} as Poliza;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private polizaService: PolizaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.polizaService.obtenerPorId(+id).subscribe({
        next: (data) => this.poliza = data,
        error: () => this.router.navigate(['/poliza'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.polizaService.actualizar(this.poliza.id_poliza, this.poliza)
      : this.polizaService.crear(this.poliza);

    operacion.subscribe({
      next: () => this.router.navigate(['/poliza']),
      error: (err) => console.error('Error guardando póliza:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/poliza']);
  }
}