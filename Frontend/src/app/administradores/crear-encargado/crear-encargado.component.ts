import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EncargadoService } from '../../services/encargado.service';
import { Encargado } from '../../models/encargado.models';

@Component({
  selector: 'app-crear-encargado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-encargado.component.html',
  styleUrls: ['./crear-encargado.component.css']
})
export class CrearEncargadoComponent {

  encargado: Encargado = {
    RutEncargado: '',
    Nombre: '',
    Apellido: '',
    Correo: '',
    Telefono: ''
  };

  error = '';

  constructor(private encargadoSrv: EncargadoService, private router: Router) {}

  guardar() {
    this.encargadoSrv.crear(this.encargado).subscribe({
      next: () => this.router.navigate(['/admin/encargados']),
      error: err => {
        console.error('Error al crear encargado:', err);
        this.error = 'No se pudo crear el encargado';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/admin/encargados']);
  }
}
