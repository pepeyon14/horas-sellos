import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa el correcto
import { CommonModule } from '@angular/common';
import { HorasSellosService, RegistroHoras } from '../services/horas-sellos.service';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent {
  rut: string = '';
  errorRut: string = '';

  constructor(private router: Router, private horasSellosService: HorasSellosService) {}

  validarRut(rut: string): boolean {
    rut = rut.replace(/[.\-]/g, '');
    if (!/^\d{7,8}[\dkK]$/.test(rut)) return false;

    const cuerpo = rut.slice(0, -1);
    const dv     = rut.slice(-1).toUpperCase();

    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : resto.toString();

    return dv === dvEsperado;
  }

  irAHorasSello() {
    if (!this.validarRut(this.rut)) {
      this.errorRut = 'RUT inválido. Debe incluir el dígito verificador (0-9 o K).';
      return;
    }

    this.errorRut = '';
    this.horasSellosService.obtenerHorasPorRut(this.rut).subscribe({
      next: (datos: RegistroHoras[]) => {
        if (datos && datos.length > 0) {
          this.router.navigate(['/horas-sellos', this.rut]);
        } else {
          this.errorRut = 'No se encontraron horas para ese RUT.';
        }
      },
      error: (err) => {
        this.errorRut = err.status === 404
          ? 'No se encontraron horas para ese RUT.'
          : 'Error al consultar las horas.';
      }
    });
  }

  volverInicio() {
    this.router.navigate(['/']);
  }
}