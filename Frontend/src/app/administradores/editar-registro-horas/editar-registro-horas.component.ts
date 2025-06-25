import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroHorasService } from '../../services/registro-horas.service';
import { RegistroHora } from '../../models/registro-horas.models';

@Component({
  selector: 'app-editar-registro-horas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-registro-horas.component.html',
  styleUrls: ['./editar-registro-horas.component.css']
})
export class EditarRegistroHorasComponent implements OnInit {
  registro: RegistroHora = {
    ID_HoraSello: 0,
    ID_Evento: 0,
    RutAlumno: '',
    RutAdministrativos: '',
    FechaInicio: '',
    FechaTermino: '',
    CantidadHoras: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private regSrv: RegistroHorasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      alert('ID inválido');
      this.router.navigate(['/admin/registro-horas']);
      return;
    }

    this.regSrv.obtenerPorId(id).subscribe({
      next: data => (this.registro = data),
      error: err => {
        console.error('Error al cargar registro:', err);
        alert('No se pudo cargar el registro');
        this.router.navigate(['/admin/registro-horas']);
      }
    });
  }

  editarRegistro(): void {
    const id = this.registro.ID_HoraSello;

    if (id === undefined || id === null) {
      alert('ID no válido');
      return;
    }

    this.regSrv.editar(id, this.registro).subscribe({
      next: () => this.router.navigate(['/admin/registro-horas']),
      error: err => {
        console.error('Error al editar registro:', err);
        alert('No se pudo actualizar el registro');
      }
    });
  }
}