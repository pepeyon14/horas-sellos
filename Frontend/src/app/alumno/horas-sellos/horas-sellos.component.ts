import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HorasSellosService, RegistroHoras } from '../../services/horas-sellos.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-horas-sellos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './horas-sellos.component.html',
  styleUrls: ['./horas-sellos.component.css']
})
export class HorasSellosComponent implements OnInit {
  rut  = '';
  nombreCompleto = '';
  horas: RegistroHoras[] = [];

  displayedColumns: string[] = [
    'evento', 'fechaInicio', 'fechaTermino',
    'horasRegistradas', 'horasEvento', 'administrador'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private horasService: HorasSellosService
  ) {}

  ngOnInit(): void {
    this.rut = this.route.snapshot.paramMap.get('rut')!;
    this.cargarHoras();
  }

  cargarHoras(): void {
    this.horasService.obtenerHorasPorRut(this.rut).subscribe({
      next: (data) => {
        this.horas = data;
        if (data.length) {
          const { NombreAlumno, ApellidoAlumno } = data[0];
          this.nombreCompleto = `${this.capitalize(NombreAlumno)} ${this.capitalize(ApellidoAlumno)}`;
        }
      },
      error: (err) => console.error('Error al obtener horas:', err)
    });
  }

  capitalize(nombre: string): string {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  }

  getTotalHoras(): number {
    return this.horas.reduce((total, item) => total + Number(item.HorasRegistradas), 0);
  }

  volver(): void {
    this.router.navigate(['/alumno']);
  }
}