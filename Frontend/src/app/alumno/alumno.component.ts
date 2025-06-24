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
    const rutRegex = /^\d{7,8}-[\dkK]$/;
    if (!rutRegex.test(rut)) return false;

    const [cuerpo, dv] = rut.split('-');
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv.toUpperCase() === dvCalculado;
  }

  irAHorasSello() {
    if (!this.validarRut(this.rut)) {
      this.errorRut = 'Formato de RUT inválido.';
      return;
    }
    this.errorRut = '';

    this.horasSellosService.obtenerHorasPorRut(this.rut).subscribe({
      next: (datos: RegistroHoras[]) => {
        if (datos && datos.length > 0) {
          this.errorRut = '';
          this.router.navigate(['/horas-sellos', this.rut]);
        } else {
          this.errorRut = 'No se encontraron horas para ese RUT.';
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorRut = 'No se encontraron horas para ese RUT.';
        } else {
          this.errorRut = 'Error al consultar las horas.';
        }
      }
    });
  }

  volverInicio() {
    this.router.navigate(['/']);
  }
}
