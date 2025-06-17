import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumno',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css'] 
})
export class AlumnoComponent {
  rut: string = '';

  constructor(private router: Router) {}

  irAHorasSello() {
    if (this.rut.trim() !== '') {
      this.router.navigate(['/horas-sellos', this.rut]);
    }
  }
  
    volverInicio() {
    this.router.navigate(['/']);
  }
}
