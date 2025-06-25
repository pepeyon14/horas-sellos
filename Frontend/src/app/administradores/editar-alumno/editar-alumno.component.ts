import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlumnoService, Alumno } from '../../services/alumno.service';

@Component({
  selector: 'app-editar-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['../crear-alumno/crear-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {

  alumno!: Alumno;
  rut!: string;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnoSrv: AlumnoService
  ) {}

  ngOnInit(): void {
    this.rut = this.route.snapshot.paramMap.get('rut')!;
    this.alumnoSrv.obtenerPorRut(this.rut).subscribe({
      next: a => this.alumno = a,
      error: () => this.error = 'No se pudo cargar el alumno'
    });
  }

  guardar(): void {
    // payload en minúscula según espera tu backend
    const payload = {
      nombre:      this.alumno.Nombre,
      apellido:    this.alumno.Apellido,
      facultad:    this.alumno.Facultad,
      carrera:     this.alumno.Carrera,
      generacion:  this.alumno.Generacion
    };

    this.alumnoSrv.editar(this.rut, payload).subscribe({
      next: () => this.router.navigate(['/alumnos']),
      error: ()  => alert('Error al guardar cambios')
    });
  }

  cancelar(): void {
    this.router.navigate(['/alumnos']);
  }
}
