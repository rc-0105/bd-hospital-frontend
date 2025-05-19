import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoDocumento } from '../../models/tipo-documento.model';
 

@Component({
  selector: 'app-tipo-documento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tipo-documento-form.component.html',
  styleUrls: ['./tipo-documento-form.component.css']
})
export class TipoDocumentoFormComponent implements OnInit {
  tipoDocumento: TipoDocumento = {
    id_tpdocumento: 0,
    tipo: ''
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoDocumentoService: TipoDocumentoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tipoDocumentoService.obtenerPorId(+id).subscribe({
        next: (data) => this.tipoDocumento = data,
        error: () => this.router.navigate(['/tipodocumento'])
      });
    }
  }

  guardar() {
    const operacion = this.isEdit 
      ? this.tipoDocumentoService.actualizar(this.tipoDocumento.id_tpdocumento, this.tipoDocumento)
      : this.tipoDocumentoService.crear(this.tipoDocumento);

    operacion.subscribe({
      next: () => this.router.navigate(['/tipodocumento']),
      error: (err) => console.error('Error guardando tipo de documento:', err)
    });
  }
  cancelar() {
    this.router.navigate(['/tipodocumento']);
  }
}