import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Para directivas como *ngIf
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { Router } from '@angular/router';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Si usas <mat-icon>


@Component({
  selector: 'app-login-adm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login-adm.component.html',
  styleUrls: ['./login-adm.component.css']
})

export class LoginAdmComponent {
  rut = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const body = { rut: this.rut, password: this.password };

    this.http.post<{ token: string }>('http://localhost:3000/api/administrativos/login', body)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          // redirige a la vista protegida
          this.router.navigate(['/horas-sellos']);
        },
        error: (err) => {
          alert(err.error?.error || 'Credenciales inválidas');
        }
      });
  }

  volverInicio() {
    this.router.navigate(['/']);
  }
}