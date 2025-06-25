import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlumnoService } from '../../services/alumno.service';
import { Alumno } from '../../services/alumno.service';

@Component({
  selector: 'app-listar-alumno',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-alumno.component.html',
  styleUrls: ['./listar-alumno.component.css']
})
export class ListarAlumnoComponent implements OnInit {
  alumnos: Alumno[] = [];
  error?: string;

  constructor(private alumnoSrv: AlumnoService, private router: Router ) {}

  ngOnInit(): void {
    this.alumnoSrv.listar().subscribe({
      next: data => this.alumnos = data,
      error: () => this.error = 'Error al cargar los alumnos'
    });
  }

  private cargarAlumnos(): void {
    this.alumnoSrv.listar().subscribe({
      next: data => this.alumnos = data,
      error: ()   => this.error = 'Error al cargar alumnos'
    });
  }

  irAEditar(rut: string): void {
    // Navega al formulario de edición, ajusta la ruta si es distinta
    this.router.navigate(['/admin/alumnos/editar', rut]);
  }

  irAEliminar(rut: string) {
    this.alumnoSrv.eliminar(rut).subscribe({
      next: () => this.cargarAlumnos(),
      error: err => {
        console.error('No se pudo eliminar el alumno:', err);
        alert('Error al eliminar el alumno');
      }
    });
  }
}