import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HorasSellosService, RegistroHoras } from '../services/horas-sellos.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-horas-sellos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // Aquí es obligatorio importar HttpClientModule
  templateUrl: './horas-sellos.component.html',
  styleUrls: ['./horas-sellos.component.css']
})


export class HorasSellosComponent implements OnInit {
  rut: string = '';
  registros: RegistroHoras[] = [];
  totalHoras: number = 0;

  constructor(
    private route: ActivatedRoute,
    private horasSellosService: HorasSellosService
  ) {}

  ngOnInit(): void {
    this.rut = this.route.snapshot.paramMap.get('rut') || '';
    if (this.rut) {
      this.horasSellosService.obtenerHorasPorRut(this.rut).subscribe({
        next: (registros: RegistroHoras[]) => {
          this.registros = registros;
          this.totalHoras = registros.reduce((total, reg) => total + reg.CantidadHoras, 0);
        },
        error: (err) => {
          console.error('Error al obtener registros:', err);
        }
      });
    }
  }
}
