import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlumnoService, Alumno } from '../../services/alumno.service';

@Component({
  selector: 'app-crear-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']   // usa el mismo CSS global
})
export class CrearAlumnoComponent {

  alumno: Alumno = {
    RutAlumno: '',
    Nombre: '',
    Apellido: '',
    Facultad: '',
    Carrera: '',
    Generacion: new Date().getFullYear()
  };

  constructor(
    private alumnoSrv: AlumnoService,
    private router: Router
  ) {}

  guardar(): void {
    const payload = {
      rut:         this.alumno.RutAlumno,
      nombre:      this.alumno.Nombre,
      apellido:    this.alumno.Apellido,
      facultad:    this.alumno.Facultad,
      carrera:     this.alumno.Carrera,
      generacion:  this.alumno.Generacion
    };

    this.alumnoSrv.crear(payload).subscribe({
      next: () => this.router.navigate(['/alumnos']),
      error: err => alert(err.error?.error ?? 'Error al crear')
    });
  }

  cancelar(): void {
    this.router.navigate(['/alumnos']);
  }
}
