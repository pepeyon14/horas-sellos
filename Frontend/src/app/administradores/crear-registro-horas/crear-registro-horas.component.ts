import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroHorasService } from '../../services/registro-horas.service';
import { RegistroHora } from '../../models/registro-horas.models';

@Component({
  selector: 'app-crear-registro-horas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-registro-horas.component.html',
  styleUrls: ['./crear-registro-horas.component.css']
})
export class CrearRegistroHorasComponent {
  registro: Omit<RegistroHora, 'ID_HoraSello'> = {
    ID_Evento: 0,
    RutAlumno: '',
    RutAdministrativos: '',
    FechaInicio: '',
    FechaTermino: '',
    CantidadHoras: 0
  };

  constructor(private regSrv: RegistroHorasService, private router: Router) {}

  crearRegistro() {
    this.regSrv.crear(this.registro).subscribe({
      next: () => this.router.navigate(['/admin/registro-horas']),
      error: err => {
        console.error('Error al crear registro:', err);
        alert('No se pudo crear el registro');
      }
    });
  }
}